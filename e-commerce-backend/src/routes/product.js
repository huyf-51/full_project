const express = require("express")
const router = express.Router()
const productController = require("../controllers/ProductController")
const upload = require("../config/image")

router.post("/addproduct", productController.addProduct);
router.post("/removeproduct", productController.removeProduct);
router.post("/upload", upload.single('product'), productController.uploadImage)
router.get("/editproduct/:id", productController.editProduct)
router.post("/updateproduct/:id", productController.updateProduct)

module.exports = router