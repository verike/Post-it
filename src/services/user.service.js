const UserModel = require('../models/user.model');

class UserService {

    // Create User
    async createUser(data) {
        return await UserModel.create(data);
    }

    // Update User
    async updateUser(id, data) {
        return await UserModel.findByIdAndDelete(id, data, {new: true});
    }

    // Delete User
    async deleteUser(id) {
        return await UserModel.findByIdAndDelete(id);
    }

    // Fetch User by ID
    async fetchUserById(id) {
        return await UserModel.findById(id);
    }

    // Fetch User by username
    async fetchUserByName(name) {
        return await UserModel.findOne(name)
    }

    // Fetch user by email
    async fetchUserByEmail(email) {
        return await UserModel.findOne(email)
    }

    // Fetch Users
    async fetchUsers(filter) {
        return await UserModel.find(filter);
    }

}

module.exports = new UserService();