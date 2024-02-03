const Transection = require("../models/transections")

//save list of transections to db
async function saveTransections(txns) {
  for (let txn of txns) {
    try {
      const transection = new Transection(txn)
      await transection.save()
    } catch (err) {
      console.log("saveSearchTxn Error:", err.message)
    }
  }
}

module.exports = { saveTransections }
