const express = require('express')
const router = express.Router()

const verifyAccessToken = require('../middleware/auth')

const AuthController = require('../controllers/auth.controller')

router.post('/register', AuthController.register)
router.post('/verifyAccessToken', verifyAccessToken, AuthController.verifyAccessToken)
router.post('/login', AuthController.login)

module.exports = router