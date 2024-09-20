
const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controller/chatController')

const router = express()

router.post('/', authMiddleware, accessChat)
router.get('/', authMiddleware, fetchChats)
router.post('/group', authMiddleware, createGroupChat)
router.put('/rename', authMiddleware, renameGroup)
router.put('/group-remove', authMiddleware, removeFromGroup)
router.put('/group-add', authMiddleware, addToGroup)

module.exports = router