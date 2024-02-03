const { sendNotification } = require("../helpers/sendNotification")
const { saveTransections } = require("../helpers/transectionsHelper")
const { updateWalletBalance } = require("../helpers/updateWallet")

async function webhookController(req, res) {
  const { body, io } = req

  try {
    // store the first transection webhook send by moralis
    if (!body.confirmed) {
      const txn = body.txs[0]
      // convert webhook format to tranection model format
      txn.block_timestamp = body.block.timestamp
      txn.block_number = body.block.number
      txn.from_address = txn.fromAddress
      txn.to_address = txn.toAddress

      //save the transection to db
      saveTransections([txn])
      await updateWalletBalance([txn.to_address, txn.from_address]) // update balance

      sendNotification(txn, io).then(() => {
        console.log("alert sent successfully")
      }) //send alerts
    }
  } catch (err) {
    console.log("webhook error: ", err.message)
  }
  return res.status(200).json()
}

module.exports = webhookController
