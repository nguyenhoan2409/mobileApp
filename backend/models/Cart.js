const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// export
module.exports = mongoose.model("Cart", cartSchema);
