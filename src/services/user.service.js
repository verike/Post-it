const UserModel = require('../models/user.model');

class UserService {

    // Create User
    async createUser(data) {
        return await UserModel.create(data);
    }

    // Update User
    async updateUser(id, data) {
        return await UserModel.findByIdAndUpdate({ _id: id }, data, { new: true });
    }

    // Delete User
    async softDeleteUser(id) {
        return await UserModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    }

    // Fetch User by ID
    async fetchUserById(id) {
        return await UserModel.findById({ _id: id });
    }

    // Fetch User by username
    async fetchUserByName(name) {
        return await UserModel.findOne({ username: name })
    }

    // Fetch user by email
    async fetchUserByEmail(email) {
        return await UserModel.findOne({ email: email })
    }

    // Fetch Users
    async fetchUsers(filter) {
        return await UserModel.find(filter);
    }

}

module.exports = new UserService();