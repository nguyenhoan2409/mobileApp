const mongoose = require("mongoose");

const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please enter your product name!"],
      },
    description: {
        type: String,
        required: [true, "Please enter your product description!"],
      },
      originalPrice: {
        type: Number,
      },
      discountPrice: {
        type: Number,
        required: [true, "Please enter your product price!"],
      },
    //   images: [
    //     {
    //       public_id: {
    //         type: String,
    //         required: true,
    //       },
    //       url: {
    //         type: String,
    //         required: true,
    //       },
    //     },
    //   ],
      brandId :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Brand",
      }
});

// export
module.exports = mongoose.model("Product", productSchema);