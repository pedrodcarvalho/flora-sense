const express = require('express');
const { getSensors, addSensorData } = require('../controllers/sensorController');

const router = express.Router();

router.get('/', getSensors);
router.post('/', addSensorData);

module.exports = router;
