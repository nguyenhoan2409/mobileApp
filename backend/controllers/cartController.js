const express = require("express");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const User = require("../models/User");

const cartController = {
  getProduct: async (req, res, next) => {
    try {
      const userId = req.query.userId; 
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

  addProduct: async (req, res, next) => {
    try {
      const userId = req.query.userId; 
      const productId = req.body.product_id;
      const quantity = Number(req.body.quantity);
  
      if (quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity." });
      }

      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ message: "User not found." });
      }

      const productExists = await Product.findById(productId);
      if (!productExists) {
        return res.status(404).json({ message: "Product not found." });
      }
  
      let cartUser = await Cart.findOne({ user_id: userId });
  
      if (!cartUser) {
        cartUser = new Cart({
          user_id: userId,
          product: []
        });
      }
  
      const listProduct = cartUser.product;
      let productFound = false;
  
      for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].product_id.toString() === productId) {
          listProduct[i].quantity += quantity;
          if (listProduct[i].quantity <= 0) {
            listProduct.splice(i, 1);
          } else {
            productFound = true;
          }
          break;
        }
      }
  
      if (!productFound && quantity > 0) {
        listProduct.push({
          product_id: productId,
          quantity: quantity,
        });
      }
  
      await cartUser.save();
      res.status(200).json(cartUser);
    } catch (error) {
      res.status(500).json({ message: "An error occurred.", error: error.message });
      next(error);
    }
  },
  
  deleteProduct: async (req, res, next) => {
    try {
      const userId = req.query.userId; 
      const productId = req.query.productId;

      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ message: "User not found." });
      }

      const productExists = await Product.findById(productId);
      if (!productExists) {
        return res.status(404).json({ message: "Product not found." });
      }

      const cartUser = await Cart.findOne({ user_id: userId });

      if (!cartUser) {
        return res.status(404).json({ message: "Cart not found." });
      }

      const productInCart = cartUser.product.some(p => p.product_id.toString() === productId);
      if (!productInCart) {
        return res.status(404).json({ message: "Product not found in cart." });
      }

      const updatedCart = await Cart.updateOne(
        { _id: cartUser._id },
        { $pull: { product: { product_id: productId } } }
      );

      const isCartEmpty = (await Cart.findById(cartUser._id)).product.length === 0;
      if (isCartEmpty) {
        await Cart.findByIdAndDelete(cartUser._id);
      }

      if (updatedCart.nModified === 0) {
        return res.status(404).json({ message: "No product was removed from the cart." });
      }

      res.status(200).json({ message: "Product removed from cart successfully." });
    } catch (error) {
      return next(error);
    }
  },

  // subtraction -done
  subProduct: async (req, res, next) => {
    try {
      const userId = req.query.userId; 
      const productId = req.query.productId;
  
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const productExists = await Product.findById(productId);
      if (!productExists) {
        return res.status(404).json({ message: "Product not found." });
      }
  
      let cartUser = await Cart.findOne({ user_id: userId });
      if (!cartUser) {
        return res.status(404).json({ message: "User does not have a cart." });
      }
  
      let productIndex = cartUser.product.findIndex(p => p.product_id.toString() === productId);
  
      if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found in cart." });
      }
  
      if (cartUser.product[productIndex].quantity > 1) {
        cartUser.product[productIndex].quantity--;
      } else {
        cartUser.product.splice(productIndex, 1);
        
        if (cartUser.product.length === 0) {
          await Cart.findByIdAndDelete(cartUser._id);
          return res.status(200).json({ message: "khong co san pham nao trong gio" });
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
