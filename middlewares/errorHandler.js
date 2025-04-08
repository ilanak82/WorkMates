// middlewares/errorHandler.js
const messages = require('../constants/messages');

// 404 Not Found handler
const notFound = (req, res) => {
    res.status(404).json({ message: messages.ROUTE_NOT_FOUND });
};

// General error handler
const errorHandler = (err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: messages.INTERNAL_SERVER_ERROR });
};

module.exports = {
    notFound,
    errorHandler,
};
