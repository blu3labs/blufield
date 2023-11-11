const { Client } = require("@bnb-chain/greenfield-js-sdk");

const client = Client.create(process.env.RPC_URL, process.env.CHAIN_ID);
module.exports = {
  client,
};
