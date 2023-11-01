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
require('dotenv').config();

const express = require("express");
//const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
//const helmet = require("helmet");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes")
const authRouter = require('./routes/authRoutes');
const roleRouter = require("./routes/roleRoutes");
const categoryRouter = require('./routes/categoryRoutes');
const shopRouter = require('./routes/shopRoutes');
const productRouter = require('./routes/productRoutes');

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
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use("/admin", userRouter );
app.use("/roles", roleRouter);
app.use('/categories', categoryRouter);
app.use('/shops', shopRouter);
app.use('/products', productRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// server running

app.listen( 8088, () => {
  console.log("Server is running...");
});

