const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { checkAdminRole } = require('../middlewares/authorization');

router.get('/all', checkAdminRole, orderController.getAllOrders);

router.get('/', checkAdminRole, orderController.getOrderById);

router.post('/update/', checkAdminRole, orderController.updateOrder);

router.post('/delete/', checkAdminRole, orderController.deleteOrder);

router.get('/sales-stats/total', checkAdminRole, orderController.getSalesStats);

module.exports = router;
