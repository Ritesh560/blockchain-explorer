const nodemailer = require("nodemailer")
const { SMTP_EMAIL } = require("../enviournments")

// nodemailer config
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
})

const sendEmailNotification = async ({ wallet_address, type, amount, email, from, to }) => {
  try {
    const text = `${amount} ${type === "received" ? "received from" : "sent to"} ${wallet_address}`
    const html = emailTemplate({ type, amount, from, to })

    const info = await transporter.sendEmailNotification({
      from: `Wasserstoff <${SMTP_EMAIL}>`,
      to: email,
      subject: "New transaction alert",
      text,
      html,
    })
    return info
  } catch (err) {
    return err
  }
}

const emailTemplate = ({ type, amount, from, to }) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Transaction Notification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 40px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #333;">Transaction Notification</h1>
          <p>Hello,</p>
          <p>You have a new transaction:</p>
          <div style="border-top: 1px solid #ccc; padding-top: 20px; margin-top: 20px;">
              <p><strong>Type:</strong>${type}</p>
              <p><strong>Amount:</strong>${(amount / 10 ** 18).toFixed(5)} ETH</p>
              <p><strong>Sender:</strong>${from}</p>
              <p><strong>Recipient:</strong>${to}</p>
          </div>
          <p>Thank you for using our service.</p>
      </div>
  </body>
  </html>
  `
}

module.exports = { sendEmailNotification }
