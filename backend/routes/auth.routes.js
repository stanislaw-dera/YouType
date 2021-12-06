const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/api/v1/auth/sign-up', authController.postSignUp);

router.post('/api/v1/auth/sign-in', authController.postSignIn);

module.exports = router;