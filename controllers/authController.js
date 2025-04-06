// controllers/authController.js

exports.register = async (req, res) => {
    try {
        // Just a test response for now
        res.status(200).json({ message: 'Register route working!' });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        // Just a test response for now
        res.status(200).json({ message: 'Login route working!' });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
