const { MORALIS_API_KEY } = require("./enviournments")

const Moralis = require("moralis").default

// Define the main function to retrieve transactions
module.exports = setupMoralis = async () => {
  // Initialize Moralis with your API key and other configurations
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  })
  console.log("Moralis setup done")
}
