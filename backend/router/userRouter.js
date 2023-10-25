const router = require("express").Router();

const userController = require("../controller/userController.js");
//create user

//GET ALL AUTHORS
router.get("", userController.getAllUser);

//GET AN AUTHOR
router.get("/:id", userController.getOneUser);

//export
module.exports = router; 