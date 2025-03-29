#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

#include "env.h"

WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHT_PIN, DHT_TYPE);

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
    int soil_moisture_percentage = map(soil_moisture_raw, 695, 1023, 100, 0); // Convert to percentagez

    char payload[100];
    snprintf(payload, sizeof(payload),
             R"({"moisture": %d, "temperature": %.2f, "humidity": %.2f, "light": %d})",
             soil_moisture_percentage, temperature, humidity, light_percentage);
    client.publish("garden/sensors", payload);

    // DEBUG //
    Serial.println("Data sent: " + String(payload));
    Serial.println("Light raw: " + String(light_raw));
    Serial.println("Soil moisture raw: " + String(soil_moisture_raw));

    delay(UPDATE_RATE); // UPDATE_RATE in ms
}
