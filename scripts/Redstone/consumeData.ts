import { ethers, network } from "hardhat";
const contractAddresses = require("./ContractAddresses.json")
const dataConsumers = contractAddresses[network.name]["dataConsumers"]

if (!dataConsumers) throw new Error(`Unsupported Network: ${network.name}`)

async function main() {
  // deploy data consumers
  const decimalsToKeep = 4;
  const dataConsumerETH = await ethers.getContractAt('DataConsumer', dataConsumers.ETH);
  const dataConsumerBTC = await ethers.getContractAt('DataConsumer', dataConsumers.BTC);
  const dataConsumerXTZ = await ethers.getContractAt('DataConsumer', dataConsumers.XTZ);
  const ethPrice = (await dataConsumerETH.getDataFeedLatestAnswer(decimalsToKeep)).toString();
  const btcPrice = (await dataConsumerBTC.getDataFeedLatestAnswer(decimalsToKeep)).toString();
  const xtzPrice = (await dataConsumerXTZ.getDataFeedLatestAnswer(decimalsToKeep)).toString();
  console.log(`ETH price: ${ethPrice.slice(0, -decimalsToKeep)}.${ethPrice.slice(-decimalsToKeep)} USD`);
  console.log(`BTC price: ${btcPrice.slice(0, -decimalsToKeep)}.${btcPrice.slice(-decimalsToKeep)} USD`);
  console.log(`XTZ price: ${xtzPrice.slice(0, -decimalsToKeep)}.${xtzPrice.slice(-decimalsToKeep)} USD`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});