const { Schema, model } = require('mongoose');
const UserModel = require('../models/user.model');
const PostModel = require('../models/post.model');

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserModel
    },
    body: {
        type: String,
        required: true,
        trim: false,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: PostModel
    }
}, {timestamps: true});

const CommentModel = model('comment', commentSchema);
module.exports = CommentModel;