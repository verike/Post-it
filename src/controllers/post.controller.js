const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const PostService = require('../services/post.service');
const UserService = require('../services/user.service');

class PostController {

    // Create a new post
    async createPost(req, res, next) {
        const { title, body } = req.body;

        // Find User
        // const existingUser = await UserService.fetchUserById(userId);

        // try {
        //     if (!existingUser) {
        //         return res.status(400).json({
        //             success: false,
        //             message: 'You are not logged in'
        //         })
        //     }

        // } catch (err) {
        //     console.log(err)
        // }
        // Check if fields are empty
        if (!title || !body) {
            return res.status(403).json({
                message: 'Title and body fields are required',
                success: 'false'
            })
        }
        else {
            try {
                const post = await PostService.createPost({ title: title, body: body });

                // try {
                //     const session = await mongoose.startSession();
                //     session.startTransaction();

                //     // Saving posts and pushing the post to a post array each time a post is created
                //     await post.save({session});
                //     existingUser.posts.push();

                //     // Saving the array
                //     await existingUser.save({session})
                //     await session.commitTransaction()

                // } catch (err) {
                //     console.log(err);
                //     return res.status(500).json({message: err})
                // }
                return res.status(200).json({
                    success: true,
                    message: 'Post created successfully',
                    data: post
                })
            } catch (err) {
                console.log(err);
            }
        }

    }

    // Update a post
    async updatePost(req, res, next) {
        const { title, body, user } = req.body
        if (!title || !body) {
            return res.status(403).json({
                message: 'Title and Body fields are required',
                success: 'false'
            })
        }
        else {
            try {
                const existingPost = await PostService.fetchPost(req.params.id);
                if (!existingPost) {
                    return res.status(403).json({
                        success: false,
                        message: 'Post not found!',
                    })
                }
                else {
                    const post = await PostService.updatePost(req.params.id, { title, body, user });
                    res.status(200).json({
                        success: true,
                        message: 'Post updated successfully.',
                        data: post
                    });
                }
            } catch (err) {
                console.log(err);
                next();
            }

        }
    }

    // Delete a post
    async softDeletePost(req, res, next) {
        const existingPost = await PostService.fetchPost(req.params.id);
        if (!existingPost) {
            return res.status(403).json({
                success: false,
                message: 'Post not found!',
            })
        }
        else {
            try {
                const post = await PostService.softDeletePost(req.params.id);

                // Removing the post from the array of blogs for the user
                // await post.user.posts.pull(post);
                // await post.user.save();

                res.status(200).json({
                    success: true,
                    message: 'Post deleted successfully!',
                    data: post
                });
            } catch (error) {
                next(error);
            }
        }
    }

    // Fetch a post
    async fetchPost(req, res, next) {
        try {
            const existingPost = await PostService.fetchPost(req.params.id);
            if (!existingPost) {
                return res.status(403).json({
                    success: false,
                    message: 'Post not found!',
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    message: 'Post fetched successfully',
                    data: existingPost
                });
            }
        } catch (err) {
            console.log(err)
            next();
        }
    }

    // Fetch a user post
    async fetchUserPosts(req, res, next) {
        const userId = req.params.id
        try {
            const existingPosts = await UserModel.findById(userId).populate('posts')
            if (!existingPosts) {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found!',
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'Posts fetched successfully',
                    data: existingPosts
                });
            }
        } catch (err) {
            console.log(err)
            next();
        }
    }

    // Fetch all posts
    async fetchPosts(req, res, next) {
        try {
            const existingBooks = await PostService.fetchPosts();
            if (!existingBooks) {
                return res.status(403).json({
                    success: false,
                    message: 'No post found!'
                })
            }
            else {
                return res.status(201).json({
                    success: true,
                    message: 'Posts fetched successfully',
                    data: existingBooks
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new PostController();