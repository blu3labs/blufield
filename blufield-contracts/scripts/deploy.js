const { parseEther, parseUnits, formatEther } = require("ethers");
const { ethers } = require("hardhat");
const { Client } = require("@bnb-chain/greenfield-js-sdk");
const axios = require("axios")
const {hexlify, toUtf8Bytes} = require("ethers")
require('dotenv').config()

async function main() {
    const [deployer] = await ethers.getSigners();
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
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }
);