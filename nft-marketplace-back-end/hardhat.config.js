/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("hardhat-contract-sizer");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("dotenv").config();

const RINKEBY_RPC_URL = process.env.RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const GOERLI_RPC = process.env.GOERLI_RPC;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    rinkeby: {
      chainId: 4,
      blockConfirmations: 6,
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    goerli: {
      chainId: 5,
      url: GOERLI_RPC,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
    },
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
    },
  },
  solidity: {
    compilers: [{ version: "0.8.9" }, { version: "0.6.6" }],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
};
