const mongoose = require('mongoose')

// function to connect DB 
async function connect() {

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully')
    } catch(error) {
        console.log('failed')
    }
}

module.exports = { connect }