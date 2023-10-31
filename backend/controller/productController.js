const express = require("express");
const Product = require("../model/Products");
const Category = require("../model/Category");
const cloudinary = require("cloudinary").v2;

// create product controller
const productController = {
  // seller - CRUD product

  // create product - done
  createProduct: async (req, res, next) => {
    try {
      const categoryId = req.body.category_id;
      //res.json(categoryId);
      const category = await Category.findById(categoryId);
      if (!category) {
        res.status(400).json("not valid category");
      } else {
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
          console.log("string");
        } else {
          images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i], {
            folder: "products",
          });
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
        const productData = new Product(req.body);
        productData.images = imagesLinks;
        productData.category_id = categoryId;
        console.log(productData);
        const product = await Product.create(productData);
        res.status(200).json(product);
      }
    } catch (error) {
      return next();
    }
  },

  // read product (get all product) - user

  // get product by category - done
  productCategory: async (req, res, next) => {
    try {
      const categoryId = req.body.id;
      const productCategory = await Product.find({ categoryId });
      res.status(200).json(productCategory);
    } catch (error) {
      return next();
    }
  },

  // update product - defaul update images - need fixed
  updateProduct: async (req, res, next) => {
    try {
      const newImages = req.body.images;
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      console.log(" get there");

      if (newImages === product.images) {
        console.log("enter if");
        await product.updateOne({ $set: req.body });
        return res
          .status(200)
          .json("Updated successfully with no image changes");
      } else {
        console.log("enter else");
        // Destroy the existing images
        for (let i = 0; i < product.images.length; i++) {
          const result = await cloudinary.uploader.destroy(
            product.images[i].public_id
          );
        }
        console.log(" destroy sucess");
        // Update images
        let images = [];
        if (typeof newImages === "string") {
          images.push(newImages);
          console.log("string");
        } else {
          images = newImages;
        }
        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i], {
            folder: "products",
          });
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
        // Update product
        product.set(req.body); // Update other fields as well
        product.images = imagesLinks;

        const updatedProduct = await product.save();
        return res.status(200).json("Updated successfully!");
      }
    } catch (error) {
      return next(error);
    }
  },

  // delete one product - done
  deleteOneProduct: async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      // Destroy the existing images
      for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.uploader.destroy(
          product.images[i].public_id
        );
      }
      //res.json(product);
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("sucess");
    } catch (error) {
      return next();
    }
  },

  // delete many product- able

  // sort product - middleware (price) able name

  // get all product - user va seller - done
  getAllProduct: async (req, res, next) => {
    try {
      const product = await Product.find({});
      res.status(200).json(product);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
};

//getRecommendProduct

// export
module.exports = productController;
