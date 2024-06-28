import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv';

dotenv.config();
const privateKey = process.env.PRIVATE_KEY || ""


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    bscTestnet: {
      url: "https://bsc-testnet-rpc.publicnode.com",
      accounts: [privateKey],
    },
    etherlinkTestnet: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: [privateKey],
    },
    etherlink: {
      url: "https://node.mainnet.etherlink.com",
      accounts: [privateKey]
    }
  },
  etherscan: {
    apiKey: {
      etherlinkTestnet: "YOU_CAN_COPY_ME",
    },
    customChains: [
      {
        network: "etherlinkTestnet",
        chainId: 128123,
        urls: {
          apiURL: "https://testnet-explorer.etherlink.com/api",
          browserURL: "https://testnet-explorer.etherlink.com"
        }
      },
    ]
  },
};

export default config;
