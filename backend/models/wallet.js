const mongoose = require("mongoose")

const walletSchema = new mongoose.Schema({
  wallet_address: {
    type: String,
    required: true,
    index: true,
  },
  sub_email: {
    type: Array,
  },
  balance: {
    type: String,
    required: true,
  },
})

module.exports = Wallet = mongoose.model("wallet", walletSchema)
