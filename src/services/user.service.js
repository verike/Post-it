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

    // Fetch User
    async fetchUser(id) {
        return await UserModel.findById(id);
    }

    // Fetch Users
    async fetchUsers(filter) {
        return await UserModel.find(filter);
    }

}

module.exports = new UserService();