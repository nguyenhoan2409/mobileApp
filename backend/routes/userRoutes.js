const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { checkAdminRole } = require('../middlewares/authorization');

router.post("/create", checkAdminRole, userController.createUser);

router.post("/", checkAdminRole, userController.updateUser);

router.get("/:id",checkAdminRole, userController.getUserById);

router.get("/",checkAdminRole, userController.getAllUser);

router.delete("/delete", checkAdminRole, userController.deleteUser);
module.exports = router;
