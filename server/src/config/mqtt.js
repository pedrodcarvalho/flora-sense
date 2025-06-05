const mqtt = require('mqtt');
const dotenv = require('dotenv');
const Sensor = require('../models/Sensor.js');

dotenv.config();

const mqttClient = mqtt.connect(process.env.MQTT_BROKER);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT Broker');
  mqttClient.subscribe(process.env.MQTT_TOPIC, (error) => {
    if (error) console.error('Failed to subscribe:', error);
  });
});

mqttClient.on('message', async (_, message) => {
  try {
    const data = JSON.parse(message.toString());
    const newSensor = new Sensor({
      temperature: data.temperature,
      humidity: data.humidity,
      moisture: data.moisture,
      light: data.light,
      score: data.score,
    });

    await newSensor.save();

    // Keep only the last 15 sensor readings
    const count = await Sensor.countDocuments();
    if (count > 15) {
      await Sensor.find({})
        .sort({ timestamp: 1 })
        .limit(count - 15)
        .then((docs) => {
          const ids = docs.map((doc) => doc._id);
          return Sensor.deleteMany({ _id: { $in: ids } });
        });
    }
  } catch (error) {
    console.error('Error processing MQTT message:', error);
  }
});

module.exports = mqttClient;
