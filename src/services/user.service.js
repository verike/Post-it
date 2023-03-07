const UserModel = require('../models/user.model');

class UserService {

    // Create User
    async createUser(user) {
        return await UserModel.create(user);
    }

    // Update User
    async updateUser(user) {
        return await UserModel.findOneAndUpdate(user);
    }

    // Delete User
    async deleteUser(user) {
        return await UserModel.findOneAndDelete(user);
    }

    // Fetch User
    async fetchUser(fiter) {
        return await UserModel.findOne(filter);
    }

    // Fetch Users
    async fetchUsers(filter) {
        return await UserModel.find(filter);
    }

}

module.exports = new UserService();