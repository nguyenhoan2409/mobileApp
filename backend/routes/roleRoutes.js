// routes/roleRoutes.js
const express = require("express");
const roleController = require("../controllers/roleController");

const router = express.Router();

const { checkAdminRole } = require('../middlewares/authorization');

router.post("/create", checkAdminRole, roleController.createRole);
router.get("/all", checkAdminRole, roleController.getAllRoles);
router.get("/", checkAdminRole, roleController.getRoleById);
router.post("/", checkAdminRole, roleController.updateRoleById);
router.post("/delete", checkAdminRole, roleController.deleteRoleById);
module.exports = router;
