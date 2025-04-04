// routes/users.js
const express = require('express');
const router = express.Router();

// Test route to verify it's working
router.post('/register', (req, res) => {
    res.json({ message: 'Register endpoint reached!' });
});

module.exports = router;
