require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-contract-sizer");
require("hardhat-log-remover");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    bsc: {
      url: "https://bsc-dataseed3.binance.org/",
      accounts: [
        process.env.PV_KEY, process.env.PV_KEY_2
      ],
    },
    bscTestnet: {
      url: "https://bsc-testnet.public.blastapi.io",
      accounts: [
        process.env.PV_KEY, process.env.PV_KEY_2
      ],
    },
  },
};
