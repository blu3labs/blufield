let privKey = "0x" + process.env.PRIVATE_KEY;
let walletAddress = process.env.WALLET_ADDRESS;

const broadcast = {
  privateKey: privKey,
  denom: "BNB",
  gasLimit: 200000,
  gasPrice: 5000000000,
  granter: walletAddress,
  payer: walletAddress,
};

module.exports = {broadcast};
