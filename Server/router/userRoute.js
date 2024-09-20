const { getLoggedInUser } = require('../controller/authController')
const {  searchUsers } = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')
const express = require('express')

const router = express()

router.get('/clientProfile',authMiddleware, getLoggedInUser)
router.get('/',authMiddleware, searchUsers)

module.exports = router