const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { checkAdminRole } = require('../middlewares/authorization');

router.get('/all', checkAdminRole,  eventController.getAllEvent);
router.post('/create',checkAdminRole,  eventController.createEvent);
router.post('/delete', checkAdminRole, eventController.deleteEvent);

module.exports = router;
