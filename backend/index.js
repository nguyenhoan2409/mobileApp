// // Using Node.js `require()`
// //import mongoose from 'mongoose';
// const mongoose = require('mongoose');

// // Using ES6 imports


// // async function connect() {
// //     try {
// //         await mongoose.connect('mongodb://localhost:27017/Furniture', {
// //             useNewUrlParser: true,
// //             useUnifiedTopology : true
// //         });
// //         console.log( ' Connect successfully!!');
// //     }
// //     catch (error) {
// //         console.log( ' Connect failure!!');
// //     }
// // }

// mongoose.connect('mongodb://localhost:27017/Furniture', () => {
//     console.log(' Connect successfully!!');
// })
 

const express = require("express");
//const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
//const helmet = require("helmet");
const dotenv = require("dotenv");
const userController = require("./controller/userController");
const userRouter = require("./router/userRouter")
const productRouter = require("./router/productRouter")


// Kết nối đến cơ sở dữ liệu MongoDB
mongoose.connect('mongodb://localhost:27017/Furniture', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Kết nối thành công đến MongoDB!');
  })
  .catch((error) => {
    console.error('Lỗi kết nối:', error);
  });

  // setup

app.use(bodyParser.json({limit:"50mb"}));
//app.use(cors());
app.use(morgan("common"));

//router

app.use("/admin", userRouter );

app.use("/seller/product",productRouter);
// server running

app.listen( 8080, () => {
  console.log("Server is running...");
});

