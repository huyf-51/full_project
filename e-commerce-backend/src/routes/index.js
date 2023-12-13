const homeRouter = require("./home")
const authRouter = require("./auth")
const cartRouter = require("./cart")
const productRouter = require("./product")
const orderRouter = require("./order")

function route(app) {
    app.use('/', homeRouter)
    app.use('/auth', authRouter)
    app.use('/cart', cartRouter)
    app.use('/product', productRouter)
    app.use('/order', orderRouter)
}

module.exports = route