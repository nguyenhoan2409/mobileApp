const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { checkAdminRole } = require('../middlewares/authorization');

router.get('/all', checkAdminRole, orderController.getAllOrders);

router.get('/:id', checkAdminRole, orderController.getOrderById);

router.post('/update/:id', checkAdminRole, orderController.updateOrder);

router.post('/delete/:id', checkAdminRole, orderController.deleteOrder);

module.exports = router;
