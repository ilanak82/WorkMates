// middlewares/dbMiddleware.js

const { poolPromise } = require("../config/db");

const attachDb = async (req, res, next) => {
    try {
        const pool = await poolPromise;
        req.db = pool;
        next();
    } catch (err) {
        console.error("Database middleware error:", err);
        res.status(500).json({ message: "Database connection failed" });
    }
};

module.exports = attachDb;
