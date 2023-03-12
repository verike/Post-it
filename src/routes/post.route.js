const { Router } = require('express');
const PostController = require('../controllers/post.controller');
const { requireAuth, checkUser } = require('../middlewares/auth.middleware')

const router = Router();

router.post('/add', requireAuth, PostController.createPost);
router.get('/:id', PostController.fetchPost);
router.put('/update/:id', requireAuth, PostController.updatePost);
router.delete('/:id', requireAuth, PostController.softDeletePost);
router.get('/user/:id', requireAuth, PostController.fetchUserPosts)
router.get('/', PostController.fetchPosts);

module.exports = router