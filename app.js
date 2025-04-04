// app.js
const express = require('express');
const app = express();
const path = require('path');

// Middleware
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form submissions
app.use(express.static(path.join(__dirname, 'public'))); // serve static files

// User routes (register/login will go here)
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
