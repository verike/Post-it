const { Schema, model } = require('mongoose');
const { post } = require('../routes/user.route');

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// postSchema.virtual('url').get(function () {
//     return '/post/' + this._id
// })

const PostModel = model('post', postSchema);
module.exports = PostModel;