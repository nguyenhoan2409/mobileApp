const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { checkAdminRole } = require('../middlewares/authorization');

router.post('/send', messageController.sendMessage);

router.get('/', messageController.getMessages);

module.exports = router;
