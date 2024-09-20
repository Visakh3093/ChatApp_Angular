const express = require('express')
const { createUser, loginUser } = require('../controller/authController')

const router = express()

router.post('/createUser', createUser)
router.post('/loginUser', loginUser)



module.exports = router


