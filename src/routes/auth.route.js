const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/signin', authController.signin);
router.get('/signout', authController.signout);

module.exports = router;