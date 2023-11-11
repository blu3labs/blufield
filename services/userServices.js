const { generateString } = require("../utils/generateString");
const { getAllSps } = require("../utils/getSps");
const { broadcast } = require("../utils/broadcast");
const fs = require("fs");

const { getCheckSums } = require("@bnb-chain/greenfiled-file-handle");

async function pushImage(file, client) {
  try {
    // save file use fs
    const filedata = fs.readFileSync(file.path);
    const { expectCheckSums, contentLength } = await getCheckSums(filedata);
    const imageTx = await client.object.createObject(
      {
        bucketName: "users",
        contentLength: contentLength,
        creator: process.env.WALLET_ADDRESS,
        expectCheckSums: JSON.parse(expectCheckSums),
        fileType: file.mimetype.split("/")[1],
        objectName: file.originalname,
        redundancyType: "REDUNDANCY_EC_TYPE",
        visibility: "VISIBILITY_TYPE_PUBLIC_READ",
      },
      {
        type: "ECDSA",
        privateKey: "0x" + process.env.PRIVATE_KEY,
        domain: generateString(10),
        seed: generateString(10),
        address: process.env.WALLET_ADDRESS,
      }
    );
    const txHash = await imageTx.broadcast({
      ...broadcast,
    });

    const uploadRes = await client.object.uploadObject(
      {
        bucketName: "users",
        objectName: file.originalname,
        body: filedata,
        txnHash: txHash.transactionHash,
      },
      {
        type: "ECDSA",
        privateKey: "0x" + process.env.PRIVATE_KEY,
        domain: generateString(10),
        seed: generateString(10),
        address: process.env.WALLET_ADDRESS,
      }
    );
    const allSps = await getAllSps(client);
    fs.unlinkSync(file.path);
    return {
      url: allSps[0].endpoint + "/view/users/images/" + file.originalname,
    };
  } catch (error) {
    console.log(error);
    return {
      error: error,
    };
  }
}

async function createUser(
  name,
  address,
  about,
  cover_image,
  profile_image,
  bucket_id,
  bucket_name,
  createdDate,
  accentColor,
  socail_media,
  montly_price
) {}

module.exports = {
  createUser,
  pushImage,
};
