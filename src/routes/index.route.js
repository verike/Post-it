const { Router } = require('express')
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
router.use('/docs', async (req, res) => {
    // Redirect the user to the endpoint documentation on postman
    res.redirect(200, 'https://documenter.getpostman.com/view/25814131/2s93JtRPY4')
})

module.exports = router