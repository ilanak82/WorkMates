// app.js

const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve public static files
app.use(express.static(path.join(__dirname, "public")));

// Inject DB connection into every request
const attachDb = require("./middlewares/dbMiddleware");
app.use(attachDb);

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Error Handlers
const { notFound, errorHandler } = require("./middlewares/errorHandler");

app.use(notFound);       // 404 for unknown routes
app.use(errorHandler);   // General error handler

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
