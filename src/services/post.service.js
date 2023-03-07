const PostModel = require('../models/post.model');

class PostService {

    // Create Post
    async createPost(data) {
        return await PostModel.create(DataView);
    }

    // Update Post
    async updatePost(id) {
        return await PostModel.findByIdAndDelete(id, data, {new: true});
    }

    // Delete Post
    async deletePost(id) {
        return await PostModel.findByIdAndDelete(id);
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