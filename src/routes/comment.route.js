const { Router } = require('express');
const CommentController = require('../controllers/comment.controller');
const postRoute = require('./post.route')


const router = Router();

router.post('/addcomment', CommentController.createComment);
router.get('/:id', CommentController.fetchComment);
router.put('/update/:id', CommentController.updateComment);
router.delete('/:id', CommentController.softDeleteComment);
router.get('/', CommentController.fetchComments);

module.exports = router