const express = require("express");
const User = require("../model/user");

const userController = {
    // create user
    createUser : async(req, res, next) => {
        try {
            
        } catch (error) {
            return next();
        }
    },

    // update user
    
    updateUser : async(req, res, next) => {
        try {
            
        } catch (error) {
            
        }
    },

    // get user by id

    getOneUser : async(req,res,next) => {
        try {
            const user = await User.findById(req.params.id);
            //res.status(200).json(user);
            if (!user) {
              return next(new ErrorHandler("User doesn't exists", 400));
            }
            else {
              res.status(200).json(user);
            }
            
          } catch (error) {
            return next(new ErrorHandler(error.message, 500));
          }

    },

    // get all user

    getAllUser : async(req,res,next) => {
        try {
            const user = await User.find({});
            res.status(200).json(user);
            
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
        
        
    }

    // delete user
}

// export
module.exports = userController;