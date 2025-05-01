require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');

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

// WebSocket Server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.set('io', io);

// Listen for MQTT messages and emit to clients
mqttClient.on('message', async (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    const { temperature, humidity, moisture, light, score } = payload;

    const sensor = {
      temperature,
      humidity,
      moisture,
      light,
      score,
      timestamp: new Date(),
    };

    io.emit('sensorData', sensor);
  } catch (error) {
    console.error('Error handling MQTT message:', error);
  }
});

io.on('connection', (socket) => {
  console.log('Connected to WS Client');
  socket.on('disconnect', () => {
    console.log('Disconnected from WS Client');
  });
});

module.exports = { server };
