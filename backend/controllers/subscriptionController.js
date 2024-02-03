const { STREAM_ID } = require("../enviournments")
const { saveTransections } = require("../helpers/transectionsHelper")
const wallet = require("../models/wallet")
const { getWalletBalance, getWalletTransections } = require("./walletController")

const Moralis = require("moralis").default

const subscribeController = async (req, res) => {
  try {
    const { email, wallet_address } = req.body

    let walletInfo = await wallet.findOne({ wallet_address })

    if (!walletInfo) {
      const balanceResponse = await getWalletBalance(wallet_address)
      const transectionsResponse = await getWalletTransections(wallet_address)
      if (balanceResponse.error || transectionsResponse.error) throw new Error("Error while fetching account data")

      const newWallet = new wallet({ wallet_address, balance: balanceResponse.data })
      await newWallet.save()

      await saveTransections(transectionsResponse.data)

      Moralis.Streams.addAddress({
        id: STREAM_ID,
        address: [wallet_address],
      }).then(() => {
        console.log("address added to stream")
      })

      walletInfo = { wallet_address, balance: balanceResponse.data, sub_email: [] }
    }

    if (walletInfo.sub_email.includes(email)) {
      throw new Error("User has already subscribed with this address")
    }

    // add email to address's subscriber list
    await wallet.updateOne({ wallet_address }, { $push: { email: email } })

    return res.status(200).json({ success: "Successfully subscribed" })
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

module.exports = subscribeController
