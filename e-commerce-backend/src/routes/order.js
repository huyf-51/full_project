const express = require("express")
const router = express.Router()
const orderController = require("../controllers/OrderController")
const fetchuser = require("../middleware/fetchuser")

// add order route
router.post("/addOrder", fetchuser, orderController.addOrder)

module.exports = router