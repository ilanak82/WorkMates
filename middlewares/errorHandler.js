// middlewares/errorHandler.js

// 404 Not Found
const notFound = (req, res) => {
    res.status(404).json({ message: "Route not found" });
};

// General Error Handler
const errorHandler = (err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: "Internal server error" });
};

module.exports = {
    notFound,
    errorHandler,
};
