const UserService = require('../services/user.service');
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const constants = require('../config/constants.config')
const JWT_SECRET = process.env.JWT_SECRET


// Error handling
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = { email: '', password: '', username: '' }

    // Incorrect email
    if (err.message === 'Incorrect email') {
        errors.email = 'This email is not registered';
    }

    // Incorrect password
    if (err.message === 'Incorrect password') {
        errors.password = 'This is an incorrect password'
    }

    // Duplicate Email Errors
    if (err.code === 11000) {
        errors.email = 'Email is already registered';
        errors.username = 'Username is taken';
        return errors;
    }


    // Validation Error
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

// 
const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: constants.maxAgeForToken
    })
}

// Sign up user

module.exports.signup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({
            message: 'Please provide username, email, and password',
            success: false,
        });
    }

    try {
        const existingUser = await UserService.fetchUserByName(username);
        if (existingUser && existingUser.isDeleted === false) {
            return res.status(400).json({
                message: 'User with that username already exists and is still active',
                success: false,
            });
        }

        const newUser = await UserService.createUser({ username, email, password, confirmPassword });
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: constants.maxAgeForCookies });

        return res.status(201).json({
            message: 'User created successfully',
            success: true,
            data: newUser,
        });
    } catch (err) {
        const errors = handleErrors(err);
        return res.status(400).json({ errors });
    }
}

//  = { signup() };



// Sign in user
module.exports.signin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(403).json({
            message: 'email and password fields are required',
            success: false
        })
    }
    else {
        try {
            const existingUser = await UserService.fetchUserByEmail(email)
            if (!existingUser) {
                return res.status(403).json({
                    message: 'User does not exists',
                    success: false
                })
            }
            else {
                const user = await existingUser.login(email, password);
                const token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: constants.maxAgeForToken });
                res.status(200).json({ user: user._id })
            }

        } catch (err) {
            const errors = handleErrors(err);
            return res.status(400).json(errors)
        }
    }
}

// module.exports = { signin() };

// Sign user out
module.exports.signout = async function (req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ user: '' })
}