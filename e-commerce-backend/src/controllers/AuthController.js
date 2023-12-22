const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

class AuthController {
    // function to handle login when client request
    async login(req, res) {
        console.log("Login");
        let success = false;
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            // if find out user compare password of user input and real password 
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

                const userName = user.name;

                // sign data with private key and return token
                const token = jwt.sign(data, process.env.PRIVATE_KEY);
                res.json({ success, token, userName });
            });
        }
        else {
            // handle when dont find out user
            return res.status(400).json({ success: success, errors: "please try with correct email/password" })
        }
    }

    // function to handle sign up
    async signup(req, res) {
        console.log("Sign Up");
        let success = false;
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            // if the email is exist return error to client
            return res.status(400).json({ success: success, errors: "existing user found with this email" });
        }

        // init cart
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        // hash the password
        const hash = await bcrypt.hash(req.body.password, 10)

        // create new user
        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: hash,
            cartData: cart,
        });

        // save new user to DB
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }

        const userName = user.name;
        // create token
        const token = jwt.sign(data, process.env.PRIVATE_KEY);
        success = true;
        res.json({ success, token, userName })
    }
}

module.exports = new AuthController()