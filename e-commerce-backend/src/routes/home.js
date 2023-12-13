const express = require("express")
const router = express.Router()
const homeController = require("../controllers/HomeController")

router.get("/allproducts", homeController.showAllProduct);
router.get("/newcollections", homeController.showNewCollections);
router.get("/popular", homeController.showPopular);
router.get("/:category", homeController.showProduct)
router.get("/relatedproduct/:productId", homeController.showRelatedProduct)

module.exports = router