const express = require("express")
const router = express.Router()
const { requireSignin, userMiddleware } = require("../common-middlewares");
const { addToCart } = require("../controller/cart")

router.post("/cart/addToCart", requireSignin, userMiddleware, addToCart)

module.exports = router;