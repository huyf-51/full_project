const express = require("express")
const router = express.Router()
const orderController = require("../controllers/OrderController")
const fetchuser = require("../middleware/fetchuser")

router.post("/addOrder", fetchuser, orderController.addOrder)
// router.get("/getOrder", fetchuser, orderController.getOrder)

module.exports = router