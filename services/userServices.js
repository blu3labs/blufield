const { generateString } = require("../utils/generateString");
const { getAllSps } = require("../utils/getSps");
const { broadcast } = require("../utils/broadcast");
const fs = require("fs");
const axios = require("axios");
const { getCheckSums } = require("@bnb-chain/greenfiled-file-handle");

async function pushImage(file, client) {
  try {
    // save file use fs
    const timeStamps = new Date().getTime();
    const filedata = fs.readFileSync(file.path);
    const { expectCheckSums, contentLength } = await getCheckSums(filedata);
    const imageTx = await client.object.createObject(
      {
        bucketName: "users",
        contentLength: contentLength,
        creator: process.env.WALLET_ADDRESS,
        expectCheckSums: JSON.parse(expectCheckSums),
        fileType: file.mimetype.split("/")[1],
        objectName: "images/" + timeStamps + file.originalname,
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
    console.log(txHash);
    const uploadRes = await client.object.uploadObject(
      {
        bucketName: "users",
        objectName: "images/" + timeStamps + file.originalname,
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
    console.log(uploadRes);
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

async function createUser(body, client) {
  try {
    console.log(body);
    const writeFile = fs.writeFileSync("user.json", JSON.stringify(body));

    const filedata = fs.readFileSync("user.json");
    console.log(filedata);

    console.log("check sum started ismail....");
    const { expectCheckSums, contentLength } = await getCheckSums(filedata);
    console.log(expectCheckSums, contentLength);
    const userTx = await client.object.createObject(
      {
        bucketName: "users",
        contentLength: contentLength,
        creator: process.env.WALLET_ADDRESS,
        expectCheckSums: JSON.parse(expectCheckSums),
        fileType: "json",
        objectName: body.name + ".json",
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
    console.log(userTx);
    const txHash = await userTx.broadcast({
      ...broadcast,
    });
    console.log(txHash);

    const uploadRes = await client.object.uploadObject(
      {
        bucketName: "users",
        objectName: body.name + ".json",
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
    console.log(uploadRes);
    fs.unlinkSync("user.json");
    return {
      message: "success",
      status: 200,
    };
  } catch (error) {
    console.log(error, "error");

    return {
      message: error,
      status: 500,
    };
  }
}

async function getAllUser(client) {
  try {
    const sps = await getAllSps(client);
    console.log(sps);
    const getAllBucketIds = await client.object.listObjects({
      bucketName: "users",
      endpoint: sps[0].endpoint,
    });
    let objects = [
      ...getAllBucketIds.body.GfSpListObjectsByBucketNameResponse.Objects,
    ];
    objects = objects.filter((v) => v.ObjectInfo.ObjectName.includes(".json"));
    let users = [];
    for (let i of objects) {
      try {
        const { data: response } = await axios.get(
          sps[0].endpoint + "/view/users/" + i.ObjectInfo.ObjectName
        );
        users.push(response);
      } catch (error) {
        console.log("errr");
      }
    }
    return {
      data: users,
      status: 200,
    };
  } catch (error) {
    console.log("err");
    return {
      error: error,
      status: 500,
    };
  }
}

async function getUser(name, client) {
  try {
    const sps = await getAllSps(client);
    const { data: response } = await axios.get(
      sps[0].endpoint + "/view/users/" + name + ".json"
    );
    return {
      data: response,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error: error,
      status: 500,
    };
  }
}

module.exports = {
  createUser,
  pushImage,
  getUser,
  getAllUser,
};
