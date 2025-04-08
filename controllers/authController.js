// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser } = require('../repositories/userRepository');

const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const existingUser = await getUserByUsername(username);
        if (existingUser) return res.status(400).json({ error: 'Username already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await getUserByUsername(username);
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, sameSite: 'Lax' });
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
