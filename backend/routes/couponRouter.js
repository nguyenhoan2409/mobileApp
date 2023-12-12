const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { checkAdminRole } = require('../middlewares/authorization');

// router.get('/all', checkAdminRole,  couponController.getAllCoupons);
// router.get('/', checkAdminRole,  couponController.getCoupon);
// router.post('/create', checkAdminRole, couponController.createCoupon);
// router.get('/byShop', checkAdminRole, couponController.getCouponOfShop);
// router.post('/delete', checkAdminRole, couponController.deleteCoupon);

// test
router.get('/all',  couponController.getAllCoupons);
router.get('/',  couponController.getCoupon);
router.post('/create', couponController.createCoupon);
router.get('/byShop', couponController.getCouponOfShop);
router.post('/delete', couponController.deleteCoupon);

module.exports = router;
