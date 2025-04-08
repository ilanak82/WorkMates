// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser } = require('../repositories/userRepository');
const messages = require('../constants/messages');
const config = require('../constants/config');

async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const existingUser = await getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: messages.USER_ALREADY_EXISTS });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser({ username, email, password: hashedPassword });
        res.status(201).json({ message: messages.USER_REGISTER_SUCCESS });
    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ error: messages.INTERNAL_SERVER_ERROR });
    }
}

async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(400).json({ error: messages.INVALID_CREDENTIALS });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: messages.INVALID_CREDENTIALS });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: config.JWT_EXPIRES_IN }
        );
        res.cookie('token', token, { httpOnly: true, sameSite: 'Lax' });
        res.status(200).json({ message: messages.LOGIN_SUCCESS });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ error: messages.INTERNAL_SERVER_ERROR });
    }
}

function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out" });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
