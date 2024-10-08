const express = require('express');
const router = express.Router();
const groupChatController = require('../controllers/chat_controller.js');
router.post('/new/group', groupChatController.addNewGroup);
router.get('/getAllGroups',groupChatController.getAllGroups)

module.exports = router;