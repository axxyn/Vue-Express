const express = require('express')
const router = express.Router()

const verifyAccessToken = require('../middleware/auth')

const CommentController = require('../controllers/comment.controller')

router.get('/post/:post_id', CommentController.getComments)

router.get('/:comment_id', CommentController.getComment)
router.delete('/:comment_id', verifyAccessToken, CommentController.deleteComment)
router.post('/', verifyAccessToken, CommentController.addComment)

module.exports = router