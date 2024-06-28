import { ethers, network } from "hardhat";
import abi from "@chainlink/contracts/abi/v0.8/AggregatorV3Interface.json"

const contractAddresses = require("./ContractAddresses.json")
const dataConsumers = contractAddresses[network.name]

if (!dataConsumers) throw new Error(`Unsupported Network: ${network.name}`)

async function main() {
  const accounts = await ethers.getSigners()

  let contract = new ethers.Contract(dataConsumers.ETH, abi, accounts[0])
  let decimals = Number(await contract.decimals())
  let answer = (await contract.latestRoundData())[1]
  const ETHPrice = ethers.formatUnits(answer.toString(), decimals)

  contract = new ethers.Contract(dataConsumers.BTC, abi, accounts[0])
  decimals = Number(await contract.decimals())
  answer = (await contract.latestRoundData())[1]
  const BTCPrice = ethers.formatUnits(answer.toString(), decimals)

  contract = new ethers.Contract(dataConsumers.XTZ, abi, accounts[0])
  decimals = Number(await contract.decimals())
  answer = (await contract.latestRoundData())[1]
  const XTZPrice = ethers.formatUnits(answer.toString(), decimals)

  console.log(`\nETH Price: ${Number(ETHPrice).toFixed(2)} USD`)
  console.log(`BTC Price: ${Number(BTCPrice).toFixed(2)} USD`)
  console.log(`XTZ Price: ${Number(XTZPrice).toFixed(2)} USD\n`)

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});