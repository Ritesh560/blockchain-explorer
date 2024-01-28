var { Web3 } = require("web3")
var provider = "https://mainnet.infura.io/v3/1b9a291e00f3413e97032668df774345"
var providerSepolia = "https://sepolia.infura.io/v3/1b9a291e00f3413e97032668df774345"
var web3Provider = new Web3.providers.HttpProvider(providerSepolia)
var web3 = new Web3(web3Provider)

const address = "0xe3dD8d5d9f551A950219A91E4a92A0d69732891f"

const getWalletBalance = (wallet_address) => {
  web3.eth
    .getBalance(wallet_address)
    .then((balance) => {
      console.log(`Balance of ${wallet_address}: ${web3.utils.fromWei(balance, "ether")} ETH`)

      return { data: web3.utils.fromWei(balance, "ether"), error: null }
    })
    .catch((error) => {
      console.error("Error fetching balance:", error)
      return { data: null, error }
    })
}

const getWalletTransections = (wallet_address) => {
  web3.eth
    .getPastLogs({ fromBlock: "0x0", address: wallet_address })
    .then((res) => {
      console.log(res)
      res.forEach((rec) => {
        console.log(rec.blockNumber, rec.transactionHash, rec.topics)
      })
    })
    .catch((err) => console.log("getPastLogs failed", err))

  web3.eth
    .getPastLogs({
      fromBlock: 0, // Start from block 0
      toBlock: "latest", // Get logs until the latest block
      address: wallet_address, // Filter by address
    })
    .then((logs) => {
      console.log("Logs:", logs)
      logs.forEach((log) => {
        console.log(log.blockNumber, log.transactionHash, log.topics)
      })

      return { data: logs, error: null }
    })
    .catch((error) => {
      console.error("Error fetching logs:", error)
      return { data: null, error }
    })
}

module.exports = {
  getWalletBalance,
  getWalletTransections,
}
