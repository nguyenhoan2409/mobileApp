const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    firstname: {
        type: String,
        required: [true, "Please enter your first name!"],
    },
    lastname: {
        type: String,
        required: [true, "Please enter your last name!"],
    },
    email:{
        type: String,
        required: [true, "Please enter your email!"],
    },

    birth : {
        type: Date,
    } ,  
      password:{
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Password should be greater than 4 characters"],
        select: false,
      },
      role:{
        type: String,
        default: "user",
      },
      avatar:{
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
     },
     createdAt:{
      type: Date,
      default: Date.now(),
     },

});

module.exports = mongoose.model("User", userSchema);