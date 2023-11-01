const router = require("express").Router();

const productController = require("../controller/productController.js");
//create product

router.post("/create-product", productController.createProduct);

//GET ALL Product
router.get("/", productController.getAllProduct);

router.get("/catagory/:id", productController.productCategory);

// //GET AN AUTHOR
// router.get("/:id", productController.getOneproduct);

// delete product 
router.delete("/:id",productController.deleteOneProduct);

// update product
router.put("/update-product/:id",productController.updateProduct);

//export
module.exports = router; 