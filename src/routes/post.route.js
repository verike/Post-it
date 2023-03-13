const { Router } = require('express');
const PostController = require('../controllers/post.controller');
const { requireAuth, checkUser } = require('../middlewares/auth.middleware')

const router = Router();

router.post('/add', checkUser, PostController.createPost);
router.get('/:id', PostController.fetchPost);
router.put('/update/:id', checkUser, PostController.updatePost);
router.delete('/:id', checkUser, PostController.softDeletePost);
router.get('/user/:id', PostController.fetchUserPosts)
router.get('/', PostController.fetchPosts);

module.exports = router