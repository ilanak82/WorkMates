// utils/jwtUtils.js

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function signToken(payload, options = { expiresIn: "1d" }) {
    return jwt.sign(payload, JWT_SECRET, options);
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    signToken,
    verifyToken,
};
