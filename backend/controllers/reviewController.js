const express = require("express");
const Review = require("../models/Review");
const Product = require("../models/Product");
const User = require("../models/User");

const reviewController = {

// get review by product - sort default
  getAllReview: async (req, res, next) => {
    try {
        const productId = req.query.productId;

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
          return res.status(400).json({ error: 'Product not found.' });
        }

        const Reviews = await Review.find({productId : productId});
        res.status(200).json(Reviews);
    } catch (error) {
      console.log("Error:", error);
      return next(error);
    }
  },
 

// user
  createReview: async (req, res, next) => {
    try {
        const { userId, productId, rating, comment } = req.body;
        
        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
          return res.status(400).json({ error: 'Product not found.' });
        }

        const newReview = new Review({
          userId,
          productId,
          rating,
          comment,
        });
    
        await newReview.save();
        return res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ message: "An error occurred.", error: error.message });
      next(error);
    }
  },

  getReviewbyStar: async(req,res,next) => {
    try {
        const productId = req.query.productId;
        const ratingStar = req.query.rating;

        console.log(ratingStar);
        console.log(productId);
        console.log("sos");

        const existingProduct = await Product.findById(productId);
        if (!existingProduct) {
          return res.status(400).json({ error: 'Product not found.' });
        }

        //const Reviews = await Review.find({productId : productId, rating : ratingStar}).populate('productId');
        const Reviews = await Review.find({productId : productId, rating : ratingStar});

        res.status(200).json(Reviews);
      
    } catch (error) {
      next(error);
    }

  },


  
// // admin
//   deleteReview: async (req, res, next) => {
//     try {
//         const id = req.query.id || req.params.id;
//         const Review = await Review.findById(id);
//         if (!Review) {
//             return res.status(404).json({ message: "Review not exits" });
//         } 
//         await Review.findByIdAndDelete(id);
//         res.status(200).json({
//             success: true,
//             message: "Delete Review Sucessfully!"
//         });

//     } catch (error) {
//       return next(error);
//     }
//   },
  
};

// export
module.exports = reviewController;
