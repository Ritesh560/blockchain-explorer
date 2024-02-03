const Wallet = require("../models/wallet")
const Moralis = require("moralis").default

//save list of transections to db
async function updateWalletBalance(adds) {
  for (let wallet_address of adds) {
    const walletInfo = await Moralis.EvmApi.balance.getNativeBalance({
      chain: "0x5",
      address: wallet_address,
    })
    const balance = walletInfo.toJSON().balance
    await Wallet.updateOne({ wallet_address }, { $set: { balance } })
  }
}

module.exports = { updateWalletBalance }
