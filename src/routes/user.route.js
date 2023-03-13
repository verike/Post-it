const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const { requireAuth, checkUser } = require('../middlewares/auth.middleware')

const router = Router();

router.post('/signup', UserController.create);
router.post('/signin', UserController.signin);
router.post('/signout', checkUser, UserController.signout);

router.get('/:id', requireAuth, UserController.fetchUser);
router.put('/update/:id', requireAuth, UserController.updateUser);
router.delete('/:id', requireAuth, UserController.softDeleteUser);
router.get('/', UserController.fetchUsers);

module.exports = router