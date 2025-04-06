// app.js

const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// Connect to database
const db = require('./config/db');

// Middleware to parse request bodies
app.use(express.json()); // Handle JSON
app.use(express.urlencoded({ extended: true })); // Handle form data

// Serve static files from /public (HTML/CSS/JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 404 for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
