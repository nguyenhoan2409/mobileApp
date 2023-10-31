const router = require("express").Router();

const cartController = require("../controller/cartController.js");

router.get("/", cartController.getProduct);

router.post("/add-product", cartController.addProduct);

router.delete("/delete-product/:id", cartController.deleteProduct);

router.delete("/sub-product/:id", cartController.subProduct);


//export
module.exports = router; 