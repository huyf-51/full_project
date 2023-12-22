const express = require("express")
const router = express.Router()
const cartController = require("../controllers/CartController")
const fetchuser = require("../middleware/fetchuser")

// add product to cart route
router.post('/addtocart', fetchuser, cartController.addCart)

// remove product from cart route
router.post('/removefromcart', fetchuser, cartController.removeCart)

// get cart route
router.post('/getcart', fetchuser, cartController.getCart)

module.exports = router