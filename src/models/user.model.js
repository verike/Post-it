const { Schema, model } = require('mongoose');
const validator = require('validator')

// User Schema Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [
            true, 'Enter Your Username'
        ],
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [
            true,
            'Enter your email address'
        ],
        unique: true,
        trim: true,
        validate: [
            validator.isEmail,
            'Enter a valid email address'
        ],
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value === this.password
            },
            message: 'Confirm password'
        }
    },
    isDeleted: { type: Boolean, default: false}

}, {timestamps: true});

const UserModel = model('user', userSchema);
module.exports = UserModel;