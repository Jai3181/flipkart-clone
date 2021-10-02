const express = require("express")
const router = express.Router()
const { signup, signin, requireSignin } = require("../../controller/admin/auth")
const { validateSignuprequest, isRequestvalidated, validateSigninrequest } = require("../../validators/auth")


router.post('/admin/signup', validateSignuprequest, isRequestvalidated, signup)
router.post('/admin/signin', validateSigninrequest, isRequestvalidated, signin)

router.post('/profile', requireSignin, (req, res) => {
  res.status(200).json({ user: "profile" })
})

module.exports = router;