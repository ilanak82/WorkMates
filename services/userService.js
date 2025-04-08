// services/userService.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUserByUsername, createUser, updateUserProfile, deleteUser } = require("../repositories/userRepository");

const JWT_SECRET = process.env.JWT_SECRET;

async function register(userData) {
    const { username, email, password } = userData;
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
        throw new Error("Username already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ username, email, password: hashedPassword });
    return { message: "User registered successfully" };
}

async function login(username, password) {
    const user = await getUserByUsername(username);
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1d" });
    return { token, message: "Login successful" };
}

async
