const wallet = require("../models/wallet")
const { sendEmailNotification } = require("./sendEmailNotification")
const { getSocketUser } = require("./socketHandlers")

const sendNotification = async (data, io) => {
  const addresses = await wallet.find({ $or: [{ wallet_address: data.from_address }, { wallet_address: data.to_address }] })
  for (const addr of addresses) {
    for (const email of addr.email) {
      const user = getSocketUser(email)
      if (!user) continue

      const wallet_address = addr.wallet_address
      const type = `${data.to_address === addr.wallet_address ? "received" : "sent"}`
      const amount = data.value

      if (user) {
        io.to(user.socketId).emit("notification", { wallet_address, type, amount })
      }
      sendEmailNotification({ wallet_address, type, amount, email, to: data.to_address, from: data.from_address })
    }
  }
}

module.exports = { sendNotification }
