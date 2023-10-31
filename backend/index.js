const express = require("express");
//const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
//const helmet = require("helmet");
require('dotenv').config();
const userController = require("./controller/userController");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const cartRouter = require("./router/cartRouter");
const cloudinary = require('cloudinary').v2;


// Kết nối đến cơ sở dữ liệu MongoDB
// dotenv.config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Kết nối thành công đến MongoDB!');
  })
  .catch((error) => {
    console.error('Lỗi kết nối:', error);
  });

// config cloudinary
cloudinary.config({
cloud_name: process.env.CLOUDINARY_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
})


// test upload image
// async function uploadImage() {
//   try {
//     const result = await cloudinary.uploader.upload('/Users/nguyenthihoanglan/Downloads/image.jpg');
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }
// uploadImage();

  // setup
app.use(bodyParser.json({limit:"50mb"}));
//app.use(cors());
app.use(morgan("common"));



//router
app.use("/admin", userRouter );
app.use("/seller/product",productRouter);
app.use("/cart", cartRouter);



// server running
app.listen(process.env.PORT , () => {
  console.log("Server is running...");
});

