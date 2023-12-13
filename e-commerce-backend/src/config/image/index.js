const multer = require("multer");
const path = require("path")

//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './src/upload/images',
    filename: (req, file, cb) => {
        console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

module.exports = multer({ storage: storage })