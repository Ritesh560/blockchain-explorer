const express = require("express")
const auth = require("../../middleware/auth")
const subscribeController = require("../../controllers/subscriptionController")
const router = express.Router()

//@route GET api/users
// @desc Test route
//@access Public
router.post("/subscribe", auth, subscribeController)

module.exports = router
