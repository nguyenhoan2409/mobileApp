const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

function isValidEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

const userController = {
    // create user
    createUser: async (req, res, next) => {
        try {
            const { username, firstName, lastName, email, address, phone, password, roleId, shopId, avatar } = req.body;

            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Username or email already exists",
                });
            }

            if (!phoneRegex.test(phone)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid phone number, please try again."
                });
            }

            if (!isValidEmail(email)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email format, please try again."
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                firstName,
                lastName,
                email,
                address,
                phone,
                password: hashedPassword,
                roleId,
                shopId,
                avatar 
            });

            await newUser.save();

            res.status(201).json({
                success: true,
                message: "User created successfully!",
                user: newUser
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },


    updateUser: async (req, res, next) => {
        try {
            const { id, password, ...updates } = req.body;
            
            const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
            
            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            
            res.status(200).json({
                success: true,
                message: "User updated successfully!",
                user: updatedUser
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            
            res.status(200).json({
                success: true,
                user: user
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
    
    getAllUser: async (req, res, next) => {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const userId = req.query.id;

            console.log(userId)
            const user = await User.findById(userId);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            
            await User.findByIdAndRemove(userId);
            
            res.status(200).json({
                success: true,
                message: "User deleted successfully!",
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    },
}

// export
module.exports = userController;