const express = require("express");
const Product = require("../model/Products");
const Cart = require("../model/Cart");

const cartController = {
  getProduct: async (req, res, next) => {
    try {
      const userId = "65368f39362bdf6d3286b98d"; // Replace with the actual user_id you want to search for
      const cartUser = await Cart.findOne({ user_id: userId });

      if (cartUser) {
        const listProduct = cartUser.product;
        res.status(200).json(listProduct);
      } else {
        res
          .status(404)
          .json({ message: "Cart not found for the specified user." });
      }
    } catch (error) {
      console.log("Error:", error);
      return next(error);
    }
  },
  // add product by quantity - done
  addProduct: async (req, res, next) => {
    try {
      const userId = "65368f39362bdf6d3286b98d"; // Replace with the actual user_id you want to search for
      const productId = req.body.product_id;
      const quantity = req.body.quantity;

      // Find the user's cart
      let cartUser = await Cart.findOne({ user_id: userId });

      if (!cartUser) {
        return res.status(404).json({ message: "User does not have a cart." });
      }

      const listProduct = cartUser.product;

      // Check if the product is already in the cart
      let productFound = false;

      for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].product_id.toString() === productId) {
          listProduct[i].quantity += quantity;
          productFound = true;
          break;
        }
      }

      // If the product is not in the cart, add it
      if (!productFound) {
        listProduct.push({
          product_id: productId,
          quantity: quantity,
        });
      }

      await cartUser.save();
      res.status(200).json(cartUser);
    } catch (error) {
      return next(error);
    }
  },

  // delete product - full - product_id error event has not been captured
  deleteProduct: async (req, res, next) => {
    try {
      const userId = "65368f39362bdf6d3286b98d";
      const productId = req.params.id;

      const newCart = await Cart.updateOne(
        { user_id: userId },
        { $pull: { product: { product_id: productId } } }
      );

      if (newCart.nModified === 0) {
        return res.status(404).json({ message: "Cart not found or product not found in cart." });
      }

      res.status(200).json({ message: "Product removed from cart successfully." });
    } catch (error) {
      return next(error);
    }
  },

  // subtraction -done
  subProduct: async (req, res, next) => {
    try {
      const userId = "65368f39362bdf6d3286b98d"; // Replace with the actual user_id you want to search for
      const productId = req.params.id;

      // Find the user's cart
      let cartUser = await Cart.findOne({ user_id: userId });

      if (!cartUser) {
        return res.status(404).json({ message: "User does not have a cart." });
      }

      const listProduct = cartUser.product;

      // Check if the product is already in the cart

      for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].product_id.toString() === productId) {
          listProduct[i].quantity--;
        }
      }
      await cartUser.save();
      res.status(200).json(cartUser);
    } catch (error) {
      return next(error);
    }
  },
};

// export
module.exports = cartController;
