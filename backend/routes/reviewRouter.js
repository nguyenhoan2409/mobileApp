const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { checkAdminRole } = require('../middlewares/authorization');

router.get('/all',  reviewController.getAllReview);
router.post('/create',  reviewController.createReview);
router.get('/star', reviewController.getReviewbyStar);

module.exports = router;
