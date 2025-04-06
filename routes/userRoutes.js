// routes/userRoutes.js

const express = require('express');
const router = express.Router();

// Just for testing
router.get('/', (req, res) => {
    res.json({ message: 'User route works!' });
});

module.exports = router;
