const express = require("express")
const router = express.Router()
const authController = require("../controllers/AuthController")

// login route
router.post('/login', authController.login)

//sign up route
router.post('/signup', authController.signup)

module.exports = router
