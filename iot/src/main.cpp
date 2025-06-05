#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <Wire.h>
#include <BH1750.h>
#include <TensorFlowLite_ESP32.h>
#include <tensorflow/lite/micro/micro_error_reporter.h>
#include <tensorflow/lite/micro/micro_interpreter.h>
#include <tensorflow/lite/micro/all_ops_resolver.h>
#include <tensorflow/lite/schema/schema_generated.h>

#include "env.h"
#include "plant_health_model.h"

WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHT_PIN, DHT_TYPE);
BH1750 lightMeter;

constexpr int kTensorArenaSize = 2 * 1024;
uint8_t tensor_arena[kTensorArenaSize];
tflite::MicroErrorReporter micro_error_reporter;
tflite::ErrorReporter *error_reporter = &micro_error_reporter;
const tflite::Model *model = nullptr;
tflite::AllOpsResolver resolver;
tflite::MicroInterpreter *static_interpreter = nullptr;

/**
 * Used MEAN and STD_DEV values from the training dataset
 * These values are used to normalize the input data
 * Scaling is done using the formula:
 * (value - mean) / std_dev
 */
const float TEMP_MEAN = 25.058, TEMP_STD_DEV = 2.936;
const float HUM_MEAN = 60.708, HUM_STD_DEV = 9.970;
const float LIGHT_MEAN = 19859.787, LIGHT_STD_DEV = 3020.656;
const float MOISTURE_MEAN = 45.088, MOISTURE_STD_DEV = 14.744;

float map_light_to_training_range(float sensor_lux)
{
    // Clamp to sensor's physical range to avoid out-of-bounds
    if (sensor_lux < 50)
        sensor_lux = 50;
    if (sensor_lux > 8000)
        sensor_lux = 8000;

    return (sensor_lux - 50) * (29294.0 - 11301.0) / (8000.0 - 50.0) + 11301.0;
}

float scale(float value, float mean, float std_dev)
{
    return (value - mean) / std_dev;
}

float run_inference(float temperature, float humidity, float light, float moisture)
{
    TfLiteTensor *input_tensor = static_interpreter->input(0);
    input_tensor->data.f[0] = scale(temperature, TEMP_MEAN, TEMP_STD_DEV);
    input_tensor->data.f[1] = scale(humidity, HUM_MEAN, HUM_STD_DEV);
    float mapped_light = map_light_to_training_range(light);
    input_tensor->data.f[2] = scale(mapped_light, LIGHT_MEAN, LIGHT_STD_DEV);
    input_tensor->data.f[3] = scale(moisture, MOISTURE_MEAN, MOISTURE_STD_DEV);

    static_interpreter->Invoke();
    TfLiteTensor *output = static_interpreter->output(0);

    return output->data.f[0];
}

// Function for setting up WiFi connection
void setup_wifi()
{
    delay(10);
    Serial.println("Connecting to WiFi...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConnected!");
}

// Function for reconnecting to MQTT Broker
void reconnect()
{
    while (!client.connected()) {
        Serial.print("Connecting to MQTT...");
        if (client.connect("ESP32_Client")) {
            Serial.println("\nConnected!");
            client.subscribe("garden/control");
        }
        else {
            Serial.print("\nFailed, retrying...");
            delay(5000);
        }
    }
}

// Callback function for handling incoming messages
void callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message received: ");
    Serial.println(topic);

    String message = "";
    for (int i = 0; i < length; i++) {
        message += (char)payload[i];
    }
    Serial.println("\nPayload: " + message);
}

// Main setup function
void setup()
{
    Serial.begin(115200); // 115200 baud rate
    // ESP32-WROOM-32 has a resolution of 12 bits (4096 analog levels) when using 3.3V
    analogSetAttenuation(ADC_11db); // Allow full 0-3.3V range
    setup_wifi();
    client.setServer(MQTT_SERVER, MQTT_PORT); // Set MQTT Broker
    client.setCallback(callback);
    dht.begin();                  // Initialize DHT sensor
    Wire.begin(I2C_SDA, I2C_SCL); // Initialize I2C with SDA on GPIO 21 and SCL on GPIO 22
    lightMeter.setMTreg(0x20);
    lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE); // Initialize BH1750
    pinMode(LDR_PIN, INPUT);                            // Set LDR pin as digital input
    pinMode(SOIL_MOISTURE_PIN, INPUT);                  // Set Soil Moisture pin as digital input
    // Initialize TensorFlow Lite
    model = tflite::GetModel(plant_health_model);
    static_interpreter = new tflite::MicroInterpreter(model, resolver, tensor_arena, kTensorArenaSize, error_reporter);
    static_interpreter->AllocateTensors();
}

// Main loop function
void loop()
{
    if (!client.connected()) {
        reconnect();
    }
    client.loop();

    // Read DHT11 sensor values
    float temperature = dht.readTemperature(); // Celsius
    float humidity = dht.readHumidity();

    // Validate readings
    if (isnan(temperature) || isnan(humidity)) {
        Serial.println("Failed to read from DHT sensor!");
        return;
    }

    /**
     * The light sensor returns values in lux (0-65535)
     * After testing in different light conditions, the values are:
     * 0-200: Indoor lamp light
     * 1000-2000: Indoor with natural light (near window but no direct sunlight)
     * 2000-5000: Indoor with natural light (direct sunlight)
     * 5000-8000: Outdoor light
     */
    float lux = lightMeter.readLightLevel();

    /**
     * After calibration, the Soil Moisture value is between 695 and 1023
     * 0-200: Dry soil; Time to water
     * 200-400: Soil is moderately moist
     * 400-600: Soil is moist; No need to water
     * 600-800: Soil is quite wet
     * 800-1023: Soil is saturated; No more watering required
     */
    int soil_moisture_raw = analogRead(SOIL_MOISTURE_PIN);
    int soil_moisture_percentage = map(soil_moisture_raw, 695, 1023, 100, 0); // Convert to percentage

    float score = run_inference(temperature, humidity, lux, soil_moisture_percentage);

    char payload[100];
    snprintf(payload, sizeof(payload),
             R"({"moisture": %d, "temperature": %.2f, "humidity": %.2f, "light": %.2f, "score": %.2f})",
             soil_moisture_percentage, temperature, humidity, lux, score);
    client.publish("garden/sensors", payload);

    // DEBUG //
    Serial.println("Data sent: " + String(payload));
    Serial.println("Light: " + String(lux));
    Serial.println("Soil moisture raw: " + String(soil_moisture_raw));

    delay(UPDATE_RATE); // UPDATE_RATE in ms
}
