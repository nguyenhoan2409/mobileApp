const router = require("express").Router();

const cartController = require("../controllers/cartController.js");

router.get("/", cartController.getProduct);

router.post("/add-product", cartController.addProduct);

router.post("/delete-product/", cartController.deleteProduct);

router.post("/sub-product/", cartController.subProduct);

router.post("/create-order/", cartController.createOrder);

router.get("/quantity", cartController.getTotalProduct);

//export
module.exports = router; 