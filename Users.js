const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
