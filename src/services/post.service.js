const PostModel = require('../models/post.model');

class PostService {

    // Create Post
    async createPost(data) {
        return await PostModel.create(DataView);
    }

    // Update Post
    async updatePost(id, data) {
        return await PostModel.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete Post
    async softDeletePost(id) {
        return await PostModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }

    // Fetch Post
    async fetchPost(id) {
        return await PostModel.findById(id)
    }

    // Fetch Posts
    async fetchPosts(filter) {
        return await PostModel.find(filter);
    }

}

module.exports = new PostService();