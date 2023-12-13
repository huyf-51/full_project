const express = require("express")
const router = express.Router()
const cartController = require("../controllers/CartController")
const fetchuser = require("../middleware/fetchuser")

router.post('/addtocart', fetchuser, cartController.addCart)
router.post('/removefromcart', fetchuser, cartController.removeCart)
router.post('/getcart', fetchuser, cartController.getCart)

module.exports = router