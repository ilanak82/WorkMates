const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");

router.get("/me", verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await req.db.request()
            .input("UserID", userId)
            .execute("sp_GetUserById");

        const user = result.recordset[0];
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            id: user.UserID,
            name: user.FullName,
            email: user.Email,
        });
    } catch (err) {
        console.error("GET /me error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
