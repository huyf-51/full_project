const Order = require("../models/order")
const User = require("../models/user")

// init cart
let cart = {};
for (let i = 0; i < 300; i++) {
    cart[i] = 0;
}

class OrderController {
    // add order for user
    async addOrder(req, res) {
        console.log(req.body);

        // create new order
        const order = new Order({
            user: req.user.id,
            address: req.body.address,
            province: req.body.province,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            payment: req.body.payment,
            orderItems: req.body.orderItems,
            totalPrice: req.body.totalPrice
        })

        // save order
        await order.save()

        // update cart after order success
        await User.updateOne({ _id: req.user.id }, { cartData: cart })
        console.log("order saved");
        res.send({ success: true })
    }
}

module.exports = new OrderController() 