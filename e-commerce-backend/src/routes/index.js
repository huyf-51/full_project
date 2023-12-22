const homeRouter = require("./home")
const authRouter = require("./auth")
const cartRouter = require("./cart")
const productRouter = require("./product")
const orderRouter = require("./order")

function route(app) {
    // main route
    app.use('/', homeRouter)

    // authentication and authorization route
    app.use('/auth', authRouter)

    // cart route
    app.use('/cart', cartRouter)

    // product handle route
    app.use('/product', productRouter)

    // order route
    app.use('/order', orderRouter)
}

module.exports = route