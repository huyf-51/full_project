const Order = require("../models/order")
const User = require("../models/user")

let cart = {};
for (let i = 0; i < 300; i++) {
    cart[i] = 0;
}

class OrderController {
    async addOrder(req, res) {
        console.log(req.body);
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
        await order.save()
        await User.updateOne({ _id: req.user.id }, { cartData: cart })
        console.log("order saved");
        res.send({ success: true })
    }

    // async getOrder(req, res) {
    //     const order = Order.find({user: req.user.id})

    // }
}

module.exports = new OrderController() 