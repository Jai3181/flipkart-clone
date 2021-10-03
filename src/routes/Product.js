const express = require("express")
const { createProduct } = require("../controller/Product")
const { requireSignin, adminMiddleware } = require("../common-middlewares");
const multer = require("multer")
const shortid = require("shortid")
const path = require("path")
const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct)
// router.get('/product/getProducts', getProducts)

module.exports = router;