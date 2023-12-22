const port = 4000
const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./config/db")
const route = require("./routes/index")
require("dotenv").config()

// set body parser to json
app.use(express.json())

// set cor policy
app.use(cors())

// set static folder to use
app.use('/images', express.static('src/upload/images'))

// connect database
db.connect()

// run all route in project
route(app)

app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port)
  else console.log("Error : ", error)
})
