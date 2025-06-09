const express = require('express')
const router = express.Router()

const verifyAccessToken = require('../middleware/auth')

const PostController = require('../controllers/post.controller')

router.get('/count/:username?', PostController.countPosts)
router.get('/post/:post_id', PostController.getPost)

router.delete('/post/:post_id', verifyAccessToken, PostController.deletePost)
router.patch('/post/:post_id', verifyAccessToken, PostController.editPost)
router.post('/post', verifyAccessToken, PostController.addPost)

router.get('/top', PostController.getTopTotalPost)
router.get('/newest', PostController.getNewestPost)


router.get('/:page?/:pageLimit?/:username?/:order?', PostController.getPosts)

module.exports = router