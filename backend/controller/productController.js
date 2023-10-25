
const express = require("express");
const Product = require("../model/Products");



const productController = {
    
    // seller - CRUD product

    // create product
    createProduct : async(req, res, next) => {
        try {
            const brandId = req.body.brandId;
            const productData = new Product (req.body);
            productData.brandId = brandId;
            const product = await Product.create(productData);
            res.status(200).json(product);
        } catch (error) {
            return next();
        }
    },

    // read product (get all product) - user

    // get product by brand
   
    productBand : async(req,res,next) => {
        try {
            const brandId = req.body.id;
            const productBand = await Product.find({brandId});
            res.status(200).json(productBand);
        } catch (error) {
            return next();
        }
    },


    // update product

    updateProduct : async(req, res, next) => {
        try {
            const product = await Product.findById(req.params.id);
            await product.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (error) {
            return next();
        }
    },

    // delete one product

    deleteOneProduct : async(req,res, next) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("sucess")
        } catch (error) {
            return next();
        }

        // res.status(200).json("delete");
    },
     
    // delete many product

    // sort product - middleware (price)



    // user - getall, SeachName, SearchImage, getbrand

    // get all product - user va seller

    getAllProduct : async(req,res,next) => {
        try {
            const product = await Product.find({});
            res.status(200).json(product);
            
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
        
        
    }

    // find product by brand

    // find product by name 

    // delete user
}

// export

module.exports = productController;


