const express = require("express")
const router = express.Router()
const homeController = require("../controllers/HomeController")

// all product route
router.get("/allproducts", homeController.showAllProduct);

// new collection route
router.get("/newcollections", homeController.showNewCollections);

// popular product route
router.get("/popular", homeController.showPopular);

// show product by categoy route
router.get("/:category", homeController.showProduct)

// show related products route
router.get("/relatedproduct/:productId", homeController.showRelatedProduct)

module.exports = router