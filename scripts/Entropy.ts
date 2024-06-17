import { ethers, network } from 'hardhat';
import web3 from 'web3';
import { eth } from "web3";

async function main() {
  const entropyContract = await ethers.getContractAt("Entropy", "0x21031182cc8b3C23e10F655aB23c7D9D22E3B7d7")

  // Running getRandomNumber function
  const randomNumber = web3.utils.randomHex(32)
  const fee = await entropyContract.getFee() + BigInt(1)
  const tx = await entropyContract.getRandomNumber(randomNumber, {value: fee.toString()})
  const txReceipt = await tx.wait();

  if(!txReceipt){
    console.error("Transaction receipt is null");
    return;
  }

  console.log("tx hash:", txReceipt.hash)

  // Decode the logs
  const eventSignature = web3.utils.keccak256("RandomNumber(uint64)");
  const logs = txReceipt.logs.filter(log => log.topics[0] === eventSignature);

  logs.forEach(log => {
    const decodedLog = eth.abi.decodeLog(
      [
        {
          type: 'uint64',
          name: 'sequenceNumber'
        }
      ],
      log.data,
      log.topics.slice(1)
    );
    
    console.log(`Random Number: ${decodedLog.sequenceNumber}`);
  });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
