const express = require("express")
const router = express.Router()
const productController = require("../controllers/ProductController")
const upload = require("../config/image")

// add product route
router.post("/addproduct", productController.addProduct);

// remove product route
router.post("/removeproduct", productController.removeProduct);

//upload image route
router.post("/upload", upload.single('product'), productController.uploadImage)

// edit product route
router.get("/editproduct/:id", productController.editProduct)

// update product route
router.post("/updateproduct/:id", productController.updateProduct)

module.exports = router