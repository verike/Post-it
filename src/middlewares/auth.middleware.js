const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model')

require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

module.exports.requireAuth = async function (req, res, next) {
    const token = req.cookies.jwt;

    // Check json web token exist
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                next();
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        return res.status(404).json({
            success: false,
            message: 'User not logged in'
        })
    }
}

// Check current user
module.exports.checkUser = async function (req, res, next) {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.user = null
                next();
            }
            else {
                console.log(decodedToken);
                let user = await UserModel.findById(decodedToken.id)
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        return res.status(404).json({
            success: false,
            message: 'Sign in to continue'
        })
        // next();
    }
}

// module.exports = { requireAuth }