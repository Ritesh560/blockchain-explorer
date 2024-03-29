const express = require("express")
const router = express.Router()
const auth = require("../../middleware/auth")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const { JWT_SECRET } = require("../../enviournments")

//@route GET api/auth
// @desc Test route
//@access Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).send("Server Error")
  }
})

//@route GET api/auth
// @desc Authenticate User and get token
//@access Public

router.post("/", [check("email", "Please include a valid email").isEmail(), check("password", "Please enter a password is required").exists()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    //check if user exist
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })
    }

    //return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) {
        throw err
      } else {
        res.json({ token })
      }
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router
