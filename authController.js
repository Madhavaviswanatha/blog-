const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const register = async (req, res) => {
    const { username, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.createUser({
        username,
        password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully', user });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findUserByUsername(username);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', {
        expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token });
};

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, 'your_jwt_secret');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = {
    register,
    login,
    authenticate
};
