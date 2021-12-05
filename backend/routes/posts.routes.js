const { Router } = require('express');
const postsController = require('../controllers/posts.controller')

const router = Router();

router.get('/api/v1/posts', postsController.getPosts);

module.exports = router;