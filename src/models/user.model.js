const { Schema, model } = require('mongoose');
const validator = require('validator')

// User Schema Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [
            validator.isEmail,
            'Input an email address'
        ]
    },
    password: {
        type: String,
        required: true,
        trim: true
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