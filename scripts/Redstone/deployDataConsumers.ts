import { ethers, network } from "hardhat";
import { DataConsumer } from "../../typechain-types";
import { verifyContract } from "../utils/verify";

// On Etherlink testnet
const contractAddresses = require("./ContractAddresses.json")
const redstonePriceFeed = contractAddresses[network.name]["redstonePriceFeed"]

if (!redstonePriceFeed) throw new Error(`Unsupported Network: ${network.name}`)


async function main() {
  // deploy data consumers
  const DataConsumer = await ethers.getContractFactory("DataConsumer");
  const dataConsumerETH = await DataConsumer.deploy(redstonePriceFeed.ETH) as DataConsumer;
  const dataConsumerBTC = await DataConsumer.deploy(redstonePriceFeed.BTC) as DataConsumer;
  const dataConsumerXTZ = await DataConsumer.deploy(redstonePriceFeed.XTZ) as DataConsumer;
  await dataConsumerETH.waitForDeployment();
  await dataConsumerBTC.waitForDeployment();
  await dataConsumerXTZ.waitForDeployment();

  console.log(`Data consumer ETH is deployed: ${await dataConsumerETH.getAddress()}`);
  console.log(`Data consumer BTC is deployed: ${await dataConsumerBTC.getAddress()}`);
  console.log(`Data consumer XTZ is deployed: ${await dataConsumerXTZ.getAddress()}`);

  // verify
  await verifyContract(dataConsumerETH, [redstonePriceFeed.ETH]);
  await verifyContract(dataConsumerBTC, [redstonePriceFeed.BTC]);
  await verifyContract(dataConsumerXTZ, [redstonePriceFeed.XTZ]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});