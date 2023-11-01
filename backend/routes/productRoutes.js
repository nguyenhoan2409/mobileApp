const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { checkAdminRole } = require('../middlewares/authorization');

router.get('/all', checkAdminRole,  productController.getAllProducts);
router.get('/', checkAdminRole,  productController.getProductById);
router.post('/create', checkAdminRole, productController.createProduct);
router.get('/byShop', checkAdminRole, productController.getProductsByShopId);
router.post('/update', checkAdminRole, productController.updateProduct);
router.post('/delete', checkAdminRole, productController.deleteProduct);

module.exports = router;
