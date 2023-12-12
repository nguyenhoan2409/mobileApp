const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { checkAdminRole } = require('../middlewares/authorization');

router.get('/all', categoryController.getAllCategories);
router.get('/', categoryController.getCategoryById);
router.post('/create',checkAdminRole, categoryController.createCategory);
router.post('/update',checkAdminRole,  categoryController.updateCategoryById);
router.post('/delete',checkAdminRole,  categoryController.deleteCategoryById);
router.post('/search', categoryController.searchCategoryByName);

module.exports = router;
