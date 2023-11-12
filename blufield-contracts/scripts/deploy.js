const { parseEther, parseUnits, formatEther } = require("ethers");
const { ethers } = require("hardhat");
const { Client } = require("@bnb-chain/greenfield-js-sdk");
const axios = require("axios")
const {hexlify, toUtf8Bytes} = require("ethers")
require('dotenv').config()

async function main() {
    const [deployer, account2] = await ethers.getSigners();
    const deployerAddress = await deployer.getAddress();
    console.log("Deploying contracts with the account:", deployerAddress);

    GROUP_HUB_ADDRESS = "0x50B3BF0d95a8dbA57B58C82dFDB5ff6747Cc1a9E"
    CROSS_CHAIN_ADDRESS = "0xa5B2c9194131A4E0BFaCbF9E5D6722c873159cb7"
    CALL_BACK_GAS_LIMIT = parseUnits("300000", 0)
    FAILURE_HANDLE_STRATEGY = 0

    const Blufield = await ethers.getContractFactory("Blufield");
    const blufield = await upgrades.deployProxy(
        Blufield, 
        [
            GROUP_HUB_ADDRESS,
            CROSS_CHAIN_ADDRESS,
            CALL_BACK_GAS_LIMIT,
            FAILURE_HANDLE_STRATEGY
        ]
    );
    await blufield.waitForDeployment();
    const blufieldAddress = await blufield.getAddress();
    console.log("Blufield deployed to:", blufieldAddress);

    const abi = [
        "function grant(address ,uint32 ,uint256 )",
    ];
    const hub = new ethers.Contract(
      GROUP_HUB_ADDRESS,
      abi,
      deployer
    );
    const timestamp = 2000000000;
    const grantRole = await hub.grant(blufieldAddress, 4, timestamp);
    await grantRole.wait();
    console.log("GrantRole tx hash:", grantRole.hash);
    
    const register = await blufield.registerField(
        "bbb",
        755,
        parseEther("0.01"),
    );
    await register.wait();
    console.log("CreateField tx hash:", register.hash);

    const subscribe = await blufield.connect(account2).subscribeField(
        "bbb",
        {
            value: parseEther("0.02"),
        }
    );
    await subscribe.wait();
    console.log("SubscribeField tx hash:", subscribe.hash);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }
);