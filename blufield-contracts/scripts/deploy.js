const { parseEther, parseUnits, formatEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

require('dotenv').config()

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    BUCKET_HUB_ADDRESS = "0x5BB17A87D03620b313C39C24029C94cB5714814A"
    GROUP_HUB_ADDRESS = "0x50B3BF0d95a8dbA57B58C82dFDB5ff6747Cc1a9E"
    OBJECT_HUB_ADDRESS = "0x1b059D8481dEe299713F18601fB539D066553e39"
    PAYMENT_ADDRESS = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"
    CROSS_CHAIN_ADDRESS = "0xa5B2c9194131A4E0BFaCbF9E5D6722c873159cb7"
    CALL_BACK_GAS_LIMIT = parseUnits("100000", 0)
    FAILURE_HANDLE_STRATEGY = 0

    const Blufield = await ethers.getContractFactory("Blufield");
    const blufield = await upgrades.deployProxy(
        Blufield, 
        [
            BUCKET_HUB_ADDRESS,
            GROUP_HUB_ADDRESS,
            OBJECT_HUB_ADDRESS,
            PAYMENT_ADDRESS,
            CROSS_CHAIN_ADDRESS,
            CALL_BACK_GAS_LIMIT,
            FAILURE_HANDLE_STRATEGY
        ]
    );
    await blufield.deployed();
    console.log("Blufield deployed to:", blufield.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }
);