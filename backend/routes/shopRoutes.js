const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const { checkAdminRole } = require('../middlewares/authorization');

router.get('/all', checkAdminRole, shopController.getAllShops);
router.get('/', checkAdminRole, shopController.getShopById);
router.post('/create', checkAdminRole, shopController.createShop);
router.post('/update', checkAdminRole, shopController.updateShopById);
router.post('/delete', checkAdminRole, shopController.deleteShopById);

module.exports = router;
