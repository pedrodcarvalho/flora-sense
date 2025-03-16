const mqtt = require('mqtt');
const dotenv = require('dotenv');
const Sensor = require('../models/Sensor.js');

dotenv.config();

const mqttClient = mqtt.connect(process.env.MQTT_BROKER);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT Broker');
  mqttClient.subscribe(process.env.MQTT_TOPIC, (err) => {
    if (err) console.error('Failed to subscribe:', err);
  });
});

mqttClient.on('message', async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const newSensor = new Sensor({
      temperature: data.temperature,
      humidity: data.humidity,
      moisture: data.moisture,
      light: data.light,
    });
    await newSensor.save();
    console.log('Sensor data saved to MongoDB');
  } catch (error) {
    console.error('Error processing MQTT message:', error);
  }
});

module.exports = mqttClient;
