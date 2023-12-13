const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

class AuthController {
    async login(req, res) {
        console.log("Login");
        let success = false;
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            // console.log(req.body.password, user.password);
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err || !result) {
                    return res.status(400).json({ success: success, errors: "please try with correct email/password" })
                }
                const data = {
                    user: {
                        id: user.id
                    }
                }
                success = true;
                // console.log(user.id);
                const userName = user.name;
                const token = jwt.sign(data, process.env.PRIVATE_KEY);
                res.json({ success, token, userName });
            });
        }
        else {
            return res.status(400).json({ success: success, errors: "please try with correct email/password" })
        }
    }

    async signup(req, res) {
        console.log("Sign Up");
        let success = false;
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: success, errors: "existing user found with this email" });
        }
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const hash = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: hash,
            cartData: cart,
        });
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }

        const userName = user.name;
        const token = jwt.sign(data, process.env.PRIVATE_KEY);
        success = true;
        res.json({ success, token, userName })
    }
}

module.exports = new AuthController()