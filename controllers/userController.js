// controllers/userController.js
const {
    getUserProfileByUsername,
    updateUserProfile,
    deleteUser
} = require('../repositories/userRepository');

async function getUser(req, res) {
    try {
        const { username } = req.params;
        const user = await getUserProfileByUsername(username);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('Get User Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function updateUser(req, res) {
    try {
        const { username } = req.params;
        const { name, email } = req.body;
        await updateUserProfile(username, { name, email });
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error('Update User Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function removeUser(req, res) {
    try {
        const { username } = req.params;
        await deleteUser(username);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Delete User Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    getUser,
    updateUser,
    removeUser
};
