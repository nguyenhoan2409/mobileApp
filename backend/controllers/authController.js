const User = require("../models/User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getToken = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide username and password"
        });
    }

    try {
        const user = await User.findOne({ username }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const token = user.getJwtToken();

        res.status(200).json({
            success: true,
            token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
