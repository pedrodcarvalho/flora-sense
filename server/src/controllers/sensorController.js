const Sensor = require('../models/Sensor');

// Fetch all sensor data
const getSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find().sort({ timestamp: -1 });
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add new sensor data
const addSensorData = async (req, res) => {
  try {
    const { temperature, humidity, moisture, light, score } = req.body;
    const newSensor = new Sensor({ temperature, humidity, moisture, light, score });
    await newSensor.save();
    res.status(201).json(newSensor);
  } catch (error) {
    res.status(400).json({ message: 'Invalid Data' });
  }
};

module.exports = { getSensors, addSensorData };
