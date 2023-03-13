const { Schema, model } = require('mongoose');
const UserModel = require('../models/user.model');
const PostModel = require('../models/post.model');

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    body: {
        type: String,
        required: true,
        trim: false,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const CommentModel = model('comment', commentSchema);
module.exports = CommentModel;