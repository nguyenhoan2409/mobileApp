// controllers/categoryController.js

const Category = require('../models/Category');

const categoryController = {

    searchCategoryByName: async (req, res, next) => {
        try {
            const { keyWord } = req.body;
            const regex = new RegExp(keyWord, 'i');

            const categories = await Category.find({ name: regex });
            
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    },
    
    getAllCategories: async (req, res, next) => {
        try {
            const categories = await Category.find({});
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    },

    getCategoryById: async (req, res, next) => {
        try {
            const { id } = req.query; 
            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    },

    createCategory: async (req, res, next) => {
        try {
            const { name, description } = req.body;

            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    message: "Category with this name already exists",
                });
            }

            const newCategory = new Category({
                name,
                description
            });

            await newCategory.save();

            res.status(201).json({
                success: true,
                message: "Category created successfully!",
                category: newCategory
            });
        } catch (error) {
            next(error);
        }
    },

    updateCategoryById: async (req, res, next) => {
        try {
            const { id, name, description } = req.body;

            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }

            category.name = name;
            category.description = description;

            await category.save();

            res.status(200).json({
                success: true,
                message: "Category updated successfully!",
                category
            });
        } catch (error) {
            next(error);
        }
    },

    deleteCategoryById: async (req, res, next) => {
        try {
            const { id } = req.query; 
            const category = await Category.findById(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            await Category.findByIdAndRemove(id);
            res.status(200).json({
                success: true,
                message: "Category deleted successfully!"
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = categoryController;
