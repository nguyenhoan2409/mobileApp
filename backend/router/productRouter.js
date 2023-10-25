const router = require("express").Router();

const productController = require("../controller/productController.js");
//create product

router.post("/create-product", productController.createProduct);

//GET ALL Product
router.get("/", productController.getAllProduct);

router.get("/brand/:id", productController.productBand);

// //GET AN AUTHOR
// router.get("/:id", productController.getOneproduct);

// delete product 
router.delete("/:id",productController.deleteOneProduct);

// update product
router.put("/:id",productController.updateProduct);

//export
module.exports = router; 