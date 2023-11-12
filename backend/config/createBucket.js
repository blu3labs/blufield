const { generateString } = require("../utils/generateString");
const { getAllSps } = require("../utils/getSps");
const { broadcast } = require("../utils/broadcast");
async function createBucket(client) {
  try {
    console.log("Creating... bucket");
    const allSps = await getAllSps(client);

    const createBucketTx = await client.bucket.createBucket(
      {
        bucketName: "blufield",
        creator: process.env.WALLET_ADDRESS,
        visibility: "VISIBILITY_TYPE_PUBLIC_READ",
        spInfo: {
          primarySpAddress: allSps[0].address,
        },
        paymentAddress: process.env.WALLET_ADDRESS,
      },
      {
        type: "ECDSA",
        privateKey: "0x" + process.env.PRIVATE_KEY,
        domain: generateString(10),
        seed: "0x" + generateString(10),
        address: process.env.WALLET_ADDRESS,
      }
    );
    const tx = await createBucketTx.broadcast({
      ...broadcast,
    });
    console.log("restart")
    const imagesFolder = await client.object.createFolder(
      {
        bucketName: "blufield",
        creator: process.env.WALLET_ADDRESS,
        objectName: "images/",
      },
      {
        type: "ECDSA",
        privateKey: "0x" + process.env.PRIVATE_KEY,
        domain: generateString(10),
        seed: "0x" + generateString(10),
        address: process.env.WALLET_ADDRESS,
      }
    );

    await imagesFolder.broadcast({
      ...broadcast,
    });
    console.log("Bucket created");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createBucket,
};
