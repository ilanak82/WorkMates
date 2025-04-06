const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { username, fname, lname, email, password, birthDate, address, picture } = req.body;

        if (!username || !fname || !lname || !email || !password || !birthDate || !address || !picture) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await req.db.request()
            .input("username", username)
            .input("fName", fname)
            .input("lName", lname)
            .input("email", email)
            .input("password", hashedPassword)
            .input("birthDate", birthDate)
            .input("address", address)
            .input("picture", picture)
            .execute("spAddUser");

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Registration failed" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await req.db.request()
            .input("email", email)
            .execute("spGetUserForLogin");

        const user = result.recordset[0];
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.UserID }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.status(200).json({
            message: "Login successful", user: {
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Login failed" });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
