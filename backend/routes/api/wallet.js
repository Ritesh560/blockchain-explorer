const express = require("express")
const auth = require("../../middleware/auth")
const { getWalletTransections, getWalletBalance } = require("../../controllers/walletController")
const router = express.Router()

//@route GET api/users
// @desc Test route
//@access Public
router.get("/:address", auth, async (req, res) => {
  const wallet_address = req.params.address

  const balance = await getWalletBalance(wallet_address)
  const transections = await getWalletTransections(wallet_address)

  if (balance?.error) res.status(500).send({ error: balance.error, msg: "Error while fetching wallet balance." })
  if (transections?.error) res.status(500).send({ error: transections.error, msg: "Error while fetching wallet transections." })

  console.log(balance.data)
  res.status(200).send({ balance: balance.data, transections: transections.data })
})

module.exports = router
