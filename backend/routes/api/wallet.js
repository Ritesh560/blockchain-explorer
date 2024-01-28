const express = require("express")
const auth = require("../../middleware/auth")
const { getWalletTransections } = require("../../middleware/test_blockchain")
const router = express.Router()

//@route GET api/users
// @desc Test route
//@access Public
router.get("/:address", auth, (req, res) => {
  const wallet_address = req.params.address

  const balance = getWalletBalance(wallet_address)
  const transections = getWalletTransections(wallet_address)

  if (balance.error) res.status(500).send({ error: balance.error, msg: "Error while fetching wallet balance." })
  if (transections.error) res.status(500).send({ error: transections.error, msg: "Error while fetching wallet transections." })

  res.status(200).send({ data: { balance, transections } })
})

module.exports = router
