const UserService = require('../services/user.service');
const { signup, signin, signout } = require('../controllers/auth.controller')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

class UserController {

    // All user authentication functions
    //  Like; Sign up , Sign in and signout were isolated from the user controller
    //  But called into play in the user controller

    // Create user
    async create(req, res) {
        return signup(req, res)
    }

    // Sign in user
    async signin(req, res) {
        return signin(req, res)
    }

    // Sign out user
    async signout(req, res) {
        return signout(req, res)
    }

    // Update user
    async updateUser(req, res) {
        const { username, email, password, confirmPassword } = req.body;
        // Check if fields we populated
        if (!username || !email || !password || !confirmPassword) {
            return res.status(403).json({
                message: 'email, username, password, confirm password fields are required',
                success: false
            })
        }
        else {
            // Check if user exists
            try {
                const existingUser = await UserService.fetchUserById(req.params.id);
                if (existingUser) {
                    const updateUser = await UserService.updateUser(req.params.id, { username: username, email: email, password: password, confirmPassword: confirmPassword });
                    return res.status(201).json({
                        success: true,
                        message: 'User successfully updated',
                        data: updateUser,
                    })
                }
                else {
                    return res.status(403).json({
                        success: false,
                        message: 'Failed to update user'
                    })
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    // Soft delete user
    async softDeleteUser(req, res) {
        const userId = req.params.id
        try {
            const existingUser = await UserService.fetchUserById(userId);
            if (!existingUser) {
                return res.status(403).json({
                    success: false,
                    message: 'User with ID does not exist.'
                })
            }
            else {
                // Check if user is soft deleted
                if (existingUser.isDeleted === true) {
                    return res.status(402).json({
                        success: false,
                        message: 'User was deleted'
                    })
                }
                else {
                    const deletedUser = await UserService.softDeleteUser(userId);
                    return res.status(201).json({
                        success: true,
                        message: 'User deleted successfully',
                        data: deletedUser
                    })
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    // Fetch a single user
    async fetchUser(req, res) {
        const userId = req.params.id
        try {
            const existingUser = await UserService.fetchUserById(userId);
            if (!existingUser) {
                return res.status(403).json({
                    success: false,
                    message: 'User does not exist'
                })
            }
            else {
                return res.status(201).json({
                    success: true,
                    message: 'User fetched successfully',
                    data: existingUser
                })
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    // Fetch all users 
    async fetchUsers(req, res) {
        try {
            // Check if users exist
            const existingUsers = await UserService.fetchUsers();
            if (!existingUsers) {
                return res.status(403).json({
                    success: false,
                    message: 'No data found'
                })
            }
            else {
                return res.status(201).json({
                    success: true,
                    message: 'Users fetched successfully',
                    data: existingUsers
                })
            }
        } catch (err) {
            console.log(err)
        }

    }

}

module.exports = new UserController();