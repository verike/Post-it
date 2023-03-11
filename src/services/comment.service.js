const CommentModel = require('../models/comment.model');

class CommentService {

    // Create comment
    async createComment(data) {
        return await CommentModel.create(data);
    }

    // Update comment
    async updateComment(id, data) {
        return await CommentModel.findByIdAndUpdate({ _id: id }, data, { new: true });
    }

    // Delete comment
    async softDeleteComment(id) {
        return await CommentModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true });
    }

    // Fetch a comment
    async fetchComment(id) {
        return await CommentModel.findById({ _id: id });
    }

    // Fetch all comments
    async fetchComments() {
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