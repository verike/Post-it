const {Router} = require('express')
const userRoute = require('./user.route')
const postRoute = require('./post.route')
const commentRoute = require('./comment.route')
// const authRoute = require('./auth.route')

const router = Router();

// General Routes
// router.use(authRoute);

router.use('/users', userRoute)
router.use('/posts', postRoute)
router.use('/comments', commentRoute)

module.exports = router