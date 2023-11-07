const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter your username!"],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, "Please enter your first name!"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        unique: true,
        validate: {
            validator: function(v) {
                // Simple email regex pattern for validation
                const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return emailRegex.test(v);
            },
            message: "Invalid email format, please try again."
        }
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                const phoneRegex = /(03|05|07|09|08|01[2|6|8|9])+([0-9]{8})\b/;
                return phoneRegex.test(v);
            },
            message: "Invalid phone number, please try again."
        }
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Password should be greater than 4 characters"],
        select: false,
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        default: null,
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        default: null,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id, roleId: this.roleId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
