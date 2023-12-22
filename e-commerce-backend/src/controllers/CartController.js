const User = require("../models/user")

class CartController {
    // function to add product to cart
    async addCart(req, res) {
        console.log("Add Cart");
        let userData = await User.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Added")
    }

    // function remove product from cart
    async removeCart(req, res) {
        console.log("Remove Cart");
        let userData = await User.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] != 0) {
            userData.cartData[req.body.itemId] -= 1;
        }
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Removed");
    }

    // function get cart of user
    async getCart(req, res) {
        console.log("Get Cart");
        console.log(req.user);
        let userData = await User.findOne({ _id: req.user.id });
        res.json(userData.cartData);
    }
}

module.exports = new CartController()