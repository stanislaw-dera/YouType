const { Router } = require('express');
const postsController = require('../controllers/posts.controller')

const router = Router();

router.get('/api/v1/posts', postsController.getPosts);

router.post('/api/v1/posts', postsController.postPost);

module.exports = router;