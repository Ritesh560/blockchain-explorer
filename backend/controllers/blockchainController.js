const { EvmChain } = require("@moralisweb3/common-evm-utils")
const Moralis = require("moralis").default
const chain = EvmChain.SEPOLIA

// const address = "0xe3dD8d5d9f551A950219A91E4a92A0d69732891f"

const getWalletBalance = async (wallet_address) => {
  try {
    // Get native balance
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address: wallet_address,
      chain,
    })
    const native = nativeBalance.result.balance.ether

    // Get token balances
    const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: wallet_address,
      chain,
    })

    const tokens = tokenBalances.result

    return { data: { native, tokens }, error: null }
  } catch (err) {
    console.log(`Something went wrong ${err}`)
    return { data: null, error: err }
  }
}

const getWalletTransections = async (wallet_address) => {
  try {
    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
      address: wallet_address,
      chain,
    })

    const transections = []
    response?.result?.map((transection) => {
      transections.push({
        from: transection?.from ?? transection?.from_address,
        to: transection?.to ?? transection?.to_address,
        gas: transection?.gas,
        amount: transection?.value,
        date: transection?.blockTimestamp,
      })
    })

    return { data: transections, error: null }
  } catch (err) {
    console.log(`Something went wrong ${err}`)
    return { data: null, error: err }
  }
}

module.exports = {
  getWalletBalance,
  getWalletTransections,
}
