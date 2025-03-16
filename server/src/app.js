require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

const sensorRoutes = require('./routes/sensorRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const mqttClient = require('./config/mqtt.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Session Handling
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Routes
app.use('/api/sensors', sensorRoutes);
app.use('/api/auth', authRoutes);

// Start MQTT Client
mqttClient;

module.exports = app;
