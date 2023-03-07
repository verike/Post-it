const CommentModel = require('../models/comment.model');

class CommentService {

    // Create comment
    async createComment(data) {
        return await CommentModel.create(data);
    }

    // Update comment
    async updateComment(id, data) {
        return await CommentModel.findByIdAndUpdate(id, data, { new: true });
    }

    // Delete comment
    async deleteComment(id) {
        return await CommentModel.findByIdAndDelete(id);
    }

    // Fetch a comment
    async fetchComment(id) {
        return await CommentModel.findById(id);
    }

    // Fetch all comments
    async fetchAllComments() {
        return await CommentModel.find();
    }

    // Fetch all comments by user
    async fetchCommentsByUser(id) {
        return await CommentModel.find({ user: id });
    }

    // Fetch all comments by post
    async fetchCommentsByPost(id) {
        return await CommentModel.find({ post: id });
    }

}

module.exports = new CommentService();