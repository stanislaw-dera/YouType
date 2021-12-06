const { Router } = require('express');
const postsController = require('../controllers/posts.controller');
const { requireAuth } = require('../middleware/auth.middleware');

const router = Router();

router.get('/api/v1/posts', requireAuth, postsController.getPosts);

router.post('/api/v1/posts', requireAuth, postsController.postPost);

module.exports = router;