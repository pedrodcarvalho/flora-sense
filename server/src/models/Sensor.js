const mongoose = require('mongoose');

const Sensor = mongoose.model(
  'Sensor',
  new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    moisture: Number,
    light: Number,
    score: Number,
    timestamp: { type: Date, default: Date.now },
  })
);

module.exports = Sensor;
