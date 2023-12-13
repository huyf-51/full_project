const mongoose = require('mongoose')

async function connect() {

    try {
        await mongoose.connect('mongodb+srv://luanhuuphan0505:luanlam1@cluster0.hnxxyyy.mongodb.net/e-commerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully')
    } catch(error) {
        console.log('failed')
    }
}

module.exports = { connect }