#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
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

constexpr int kTensorArenaSize = 2 * 1024;
uint8_t tensor_arena[kTensorArenaSize];
tflite::MicroErrorReporter micro_error_reporter;
tflite::ErrorReporter *error_reporter = &micro_error_reporter;
const tflite::Model *model = nullptr;
tflite::AllOpsResolver resolver;
tflite::MicroInterpreter *static_interpreter = nullptr;

// Scale the sensor values to a range of 0-1
const float TEMP_MIN = 15.0, TEMP_MAX = 36.0;
const float HUM_MIN = 30.0, HUM_MAX = 91.0;
const float MOIST_MIN = 0.0, MOIST_MAX = 100.0;
const float LIGHT_MIN = 11301.0, LIGHT_MAX = 29294.0;

float scale(float value, float min, float max)
{
    return (value - min) / (max - min);
}

float run_inference(float temperature, float humidity, float light, float moisture)
{
    TfLiteTensor *input_tensor = static_interpreter->input(0);
    input_tensor->data.f[0] = scale(temperature, TEMP_MIN, TEMP_MAX);
    input_tensor->data.f[1] = scale(humidity, HUM_MIN, HUM_MAX);
    input_tensor->data.f[2] = scale(light, LIGHT_MIN, LIGHT_MAX);
    input_tensor->data.f[3] = scale(moisture, MOIST_MIN, MOIST_MAX);

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
    dht.begin();                       // Initialize DHT sensor
    pinMode(LDR_PIN, INPUT);           // Set LDR pin as digital input
    pinMode(SOIL_MOISTURE_PIN, INPUT); // Set Soil Moisture pin as digital input
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
     * After calibration, the LDR value is between 0 and 1984
     * This happens because its being used a 10k ohm resistor in series
     * with the LDR, which is a voltage divider circuit
     */
    int light_raw = analogRead(LDR_PIN);
    int light_percentage = map(light_raw, 0, 1984, 100, 0); // Convert to percentage

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

    // DEBUG: [26.4901424590337, 73.99355436586002, 18728.72095393189, 34.87232587538428]
    float score = run_inference(26.49, 73.99, 18728.72, 34.87);

    char payload[100];
    snprintf(payload, sizeof(payload),
             R"({"moisture": %d, "temperature": %.2f, "humidity": %.2f, "light": %d, "score": %.2f})",
             soil_moisture_percentage, temperature, humidity, light_percentage, score);
    client.publish("garden/sensors", payload);

    // DEBUG //
    Serial.println("Data sent: " + String(payload));
    Serial.println("Light raw: " + String(light_raw));
    Serial.println("Soil moisture raw: " + String(soil_moisture_raw));

    delay(UPDATE_RATE); // UPDATE_RATE in ms
}
