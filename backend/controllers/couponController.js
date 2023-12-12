const express = require("express");
const Coupon = require("../models/Coupon");
const Shop = require("../models/Shop");

const couponController = {
  // use by seller
  getAllCoupons: async (req, res, next) => {
    try {
      const coupons = await Coupon.find({});
      res.status(200).json(coupons);
    } catch (error) {
      console.log("Error:", error);
      return next(error);
    }
  },
  // get coupon by id - use when user enter code coupon
  getCoupon: async (req, res, next) => {
    try {
      const { id } = req.query;
      const coupon = await Coupon.findById(id).populate("shopId");
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }
      res.status(200).json(coupon);
    } catch (error) {
      console.log("Error:", error);
      return next(error);
    }
  },
  // get coupon of shop
  getCouponOfShop: async (req, res, next) => {
    try {
      const { shopId } = req.query;

      const shop = await Shop.findOne({ _id: shopId });
      if (!shop) {
        return res.status(404).json({ message: "Shop không tồn tại." });
      }
      const coupons = await Coupon.find({ shopId: shopId });
      res.status(200).json(coupons);
    } catch (error) {
      console.log("Error:", error);
      return next(error);
    }
  },

  createCoupon: async (req, res, next) => {
    try {
      const isCouponCodeExists = await Coupon.findOne({
        code: req.body.code,
      });
  
      if (isCouponCodeExists ) {
        return res.status(404).json({ message: "Coupon code already exists!" });
      }
  
      const coupon = await Coupon.create(req.body);
      res.status(201).json({
        success: true,
        message: "Coupon created successfully!",
        coupon,
      });
    } catch (error) {
      res.status(500).json({ message: "An error occurred.", error: error.message });
      next(error);
    }
  },

  deleteCoupon: async (req, res, next) => {
    try {
      const id = req.query.id || req.params.id;
      const coupon = await Coupon.findById(id);
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not exits" });
      }
      await Coupon.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Delete Coupon Sucessfully!",
      });
    } catch (error) {
      return next(error);
    }
  },
};

// export
module.exports = couponController;
