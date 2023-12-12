const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    index : true,
    unique: true,
  },
  discountPercentage: {
    type: Number,
  },
  validUntil: {
    type: Date,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
  // applyFor: [
  //   {
  //     product_id: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Product",
  //     },
  //   },
  // ],
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
