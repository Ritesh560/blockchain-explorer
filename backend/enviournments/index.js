//setup dotenv for env variables access
require("dotenv").config()

module.exports = {
  MORALIS_API_KEY: process.env.MORALIS_API_KEY,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
}
