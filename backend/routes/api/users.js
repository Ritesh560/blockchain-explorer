const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const User = require("../../models/User")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../enviournments")

router.post("/", [check("name", "Name is required").not().isEmpty(), check("email", "Please include a valid email").isEmail(), check("wallet_address", "wallet address is required").not().isEmpty(), check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(req.body)
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password, wallet_address } = req.body

  try {
    //check if user exist
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] })
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    })

    user = new User({
      name,
      email,
      avatar,
      password,
      wallet_address,
    })

    //hashing the password
    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()

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
