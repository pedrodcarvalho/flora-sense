#include <WiFi.h>
#include <PubSubClient.h>

#include "env.h"

WiFiClient espClient;
PubSubClient client(espClient);

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
    setup_wifi();
    client.setServer(MQTT_SERVER, MQTT_PORT); // Set MQTT Broker
    client.setCallback(callback);
}

// Main loop function
void loop()
{
    if (!client.connected()) {
        reconnect();
    }
    client.loop();

    // Publish mock sensor data
    int soil_moisture = 50;
    int temperature = 25;
    int humidity = 60;
    int light = 100;

    char payload[100];
    snprintf(payload, sizeof(payload),
             R"({"moisture": %d, "temperature": %d, "humidity": %d, "light": %d})",
             soil_moisture, temperature, humidity, light);
    client.publish("garden/sensors", payload);

    delay(UPDATE_RATE); // UPDATE_RATE in ms
}
