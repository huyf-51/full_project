const Product = require("../models/product")

class HomeController {
    async showAllProduct(req, res) {
        let products = await Product.find({});
        console.log("All Products");
        res.send(products);
    }

    async showNewCollections(req, res) {
        let products = await Product.find({});
        let arr = products.slice(1).slice(-8);
        console.log("New Collections");
        res.send(arr);
    }

    async showPopular(req, res) {
        let products = await Product.find({});
        let arr = products.splice(0, 4);
        console.log("Popular");
        res.send(arr);
    }

    async showProduct(req, res) {
        let startIndex = (req.query.page - 1) * 4
        let category = req.params.category

        let productCount = await Product.countDocuments({ category: category })

        let products = await Product.find({ category: category }).limit(4).skip(startIndex).exec()
        res.json({ products: products, productCount: productCount })
    }

    async showRelatedProduct(req, res) {
        const product = await Product.find({ id: req.params.productId })
        const relatedProduct = await Product.find({ category: product[0].category, id: { $ne: req.params.productId } }) 
            .limit(4)
            .exec()
            // console.log("related product: ", relatedProduct);
        res.send(relatedProduct)
    }
}

module.exports = new HomeController()