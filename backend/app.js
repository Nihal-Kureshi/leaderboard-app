// app.js
const express = require('express');
const cors = require('cors');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => res.json({ message: 'Server is running!' }));

// Routes
app.use('/api', leaderboardRoutes);

module.exports = app;
