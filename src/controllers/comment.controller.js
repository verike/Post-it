const CommentModel = require('../models/comment.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const CommentService = require('../services/comment.service');

class CommentController {

    // Create a new comment
    async createComment(req, res, next) {

        // find out the post being commented on
        const postId = req.params.id;

        // Get user id 
        // And Check if user is logged in        

        if (res.locals.user._id === null) {
            throw new Error('User not logged in')
        }
        const userId = res.locals.user._id


        // Get comment body text and record post id
        const { body } = req.body;
        if (!body) {
            return res.status(403).json({
                message: 'Body is required',
                success: 'false'
            })
        }
        else {
            try {
                const comment = await CommentService.createComment({ body: body, postId: postId, userId: userId });

                // Add comment to user's comment array, and to the post's comment array
                await UserModel.updateOne({ _id: userId }, { $push: { comments: comment.body } });
                await PostModel.updateOne({ _id: postId }, { $push: { comments: comment.body } });

                res.status(200).json({
                    success: true,
                    message: 'Comment created successfully',
                    data: comment
                })
            } catch (err) {
                console.log(err);
            }
        }

    }

    // Update a Comment
    async updateComment(req, res, next) {
        const { body } = req.body
        if (!body) {
            return res.status(403).json({
                message: 'Body is required',
                success: 'false'
            })
        }
        else {
            try {
                const existingComment = await CommentService.fetchComment(req.params.id);
                if (!existingComment) {
                    return res.status(403).json({
                        success: false,
                        message: 'Comment not found!',
                    })
                }
                else {
                    const comment = await CommentService.updateComment(req.params.id, { body: body, postId: postId, userId: userId });

                    // Add comment to updated user's comment array, and to the post's comment array
                    await UserModel.updateOne({ _id: userId }, { $push: { comments: comment.body } });
                    await PostModel.updateOne({ _id: postId }, { $push: { comments: comment.body } });

                    res.status(200).json({
                        success: true,
                        message: 'Comment updated successfully.',
                        data: comment
                    });
                }
            } catch (err) {
                console.log(err);
                next();
            }

        }
    }

    // Delete a Comment
    async softDeleteComment(req, res, next) {
        const existingComment = await CommentService.fetchComment(req.params.id);
        if (!existingComment) {
            return res.status(403).json({
                success: false,
                message: 'Comment not found!',
            })
        }
        else {
            try {
                const comment = await CommentService.softDeleteComment(req.params.id);
                res.status(200).json({
                    success: true,
                    message: 'Comment deleted successfully!',
                    data: comment
                });
            } catch (error) {
                next(error);
            }
        }
    }

    // Fetch a Comment
    async fetchComment(req, res, next) {
        try {
            const existingComment = await CommentService.fetchComment(req.params.id);
            if (!existingComment) {
                return res.status(403).json({
                    success: false,
                    message: 'Comment not found!',
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    message: 'Comment fetched successfully',
                    data: existingComment
                });
            }
        } catch (err) {
            console.log(err)
            next();
        }
    }

    // Fetch all Comments
    async fetchComments(req, res, next) {
        try {
            const existingComments = await CommentService.fetchComments();
            if (!existingComments) {
                return res.status(403).json({
                    success: false,
                    message: 'No Comment found!'
                })
            }
            else {
                return res.status(201).json({
                    success: true,
                    message: 'Comments fetched successfully',
                    data: existingComments
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new CommentController();