const PostService = require('../services/post.service');

class PostController {

    // Create a new post
    async createPost(req, res, next) {
        const { title, body, user } = req.body;
        if(!title || !body) {
            return res.status(403).json({
                message: 'Title and Body fields are required',
                success: 'false'
            })
        }
        else {
            try {
                const post = await PostService.createPost({ title: title, body: body, user: user });
                res.status(200).json({
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
        if(!title || !body) {
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

    // Fetch all posts
    async fetchPosts (req, res, next) {
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