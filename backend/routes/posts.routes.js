const { Router } = require('express');
const postsController = require('../controllers/posts.controller')

const router = Router();

router.get('/api/v1/posts/hello', postsController.getHello);

module.exports = router;