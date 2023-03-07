const { Schema, model } = require('mongoose');

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
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

}, {timestamps: true});

const UserModel = model('user', userSchema);
module.exports = UserModel;