const express = require('express')
const router = express.Router()

const verifyAccessToken = require('../middleware/auth')

const ThumbController = require('../controllers/thumb.controller')

router.get('/user/:username/:post_id', ThumbController.getUserThumb)
router.post('/', verifyAccessToken, ThumbController.addThumb)
router.get('/:post_id', ThumbController.getThumbForPost)

module.exports = router