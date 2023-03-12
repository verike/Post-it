const PostModel = require('../models/post.model');

class PostService {

    // Create Post
    async createPost(data) {
        return await PostModel.create(data);
    }

    // Update Post
    async updatePost(id, data) {
        return await PostModel.findByIdAndUpdate({_id: id}, data, { new: true });
    }

    // Delete Post
    async softDeletePost(id) {
        return await PostModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true })
    }

    // Fetch Post
    async fetchPost(id) {
        return await PostModel.findById({_id: id})
    }

    // Fetch Posts
    async fetchPosts(filter) {
        return await PostModel.find(filter);
    }

}

module.exports = new PostService();