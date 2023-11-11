import { getEddsaCompressedPublicKey } from "@bnb-chain/greenfield-zk-crypto";
import { getOffchainAuthKeys } from "./auth";
import { client } from "./client";
import axios from "axios";
import { getCheckSums } from "@bnb-chain/greenfiled-file-handle";

import { api } from "./api";
const generateString = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz";

  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const CreateData = async (
  bucketName,
  address,
  signer,
  chain,
  switchNetworkAsync,
  data,
  type
) => {
  const broadcasting = {
    gasLimit: 1000000,
    gasPrice: 5000000000,
    granter: address,
    payer: address,
    denom: "BNB",
  };
  const auth = await getOffchainAuthKeys(
    address,
    signer,
    switchNetworkAsync,
    chain
  );

  const signingData = {
    type: "EDDSA",
    seed: auth.seedString,
    domain: window.location.origin,
    address,
  };

  if (type === "text") {
    data = {
      title: data.title,
      shortText: data.shortText,
      bannerUrl: data.bannerUrl,
      text: data.text,
    };

    console.log("hooo");

    const folderName = generateString(10);
    const folder = await client.object.createFolder(
      {
        bucketName: bucketName,
        creator: address,

        objectName: folderName + "/",
        visibility: "VISIBILITY_TYPE_PRIVATE",
      },
      signingData
    );

    //   const tx =   await folder.broadcast({
    //  ...broadcasting

    //     })

    const metadataForUs = {
      userAddress: address,
      banner: data.bannerURL,
      title: data.title,
      short_text: data.short_text,
    };

    // create metadata.

    const metadataResponse = await api.post("/checksums", metadataForUs, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const contentResponse = await api.post("/checksums", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const metadataObject = await client.object.createObject(
      {
        bucketName: bucketName,
        contentLength: metadataResponse.data.contentLength,
        creator: address,
        expectCheckSums: JSON.parse(metadataResponse.data.expectCheckSums),
        fileType: "json",
        objectName: folderName + "/metadata.json",
        redundancyType: "REDUNDANCY_EC_TYPE",
        visibility: "VISIBILITY_TYPE_PUBLIC_READ",
      },
      signingData
    );

    const userTx = await client.object.createObject(
      {
        bucketName: bucketName,
        contentLength: contentResponse.data.contentLength,
        creator: address,
        expectCheckSums: JSON.parse(contentResponse.data.expectCheckSums),
        fileType: "json",
        objectName: folderName + "/content.json",
        redundancyType: "REDUNDANCY_EC_TYPE",
        visibility: data.visibility,
      },
      signingData
    );

    const multitx = await client.txClient.multiTx([
      folder,
      metadataObject,
      userTx,
    ]);
    const txMultiCreate = await multitx.broadcast({
      ...broadcasting,
    });
    //    const txMeta=  await metadataObject.broadcast({
    //         ...broadcasting
    //     })

    console.log("txxxx ", txMultiCreate);
    const filedata = Buffer.from(JSON.stringify(data).toString("utf8"));
    const metadatafile = Buffer.from(
      JSON.stringify(metadataForUs).toString("utf8")
    );

    const uploadRes = await client.object.uploadObject(
      {
        bucketName: bucketName,
        objectName: folderName + "/content.json",
        body: filedata,
        txnHash: txMultiCreate.transactionHash,
      },
      signingData
    );

    const metadataUpload = await client.object.uploadObject(
      {
        bucketName: bucketName,
        objectName: folderName + "/metadata.json",
        body: metadatafile,
        txnHash: txMultiCreate.transactionHash,
      },
      signingData
    );

    console.log("Metadata uploaded for us.");
    // folder: metadata.json    content.json

    // create object

    // uppload banner
    console.log(address, signer, switchNetworkAsync, chain);
    console.log("auth", auth);

    // const { expectCheckSums, contentLength } = await getCheckSums(filedata);

    // const req  = await api.post("/checksums", data, {
    //     headers: {
    //         "Content-Type": "application/json"
    //     }

    // })

    console.log("signnnnn");

    //     const txHash = await userTx.broadcast({denom:"BNB",

    // gasLimit:1000000,
    // gasPrice:5000000000,
    // granter: address,
    // payer: address
    // })

    // update partial part of metadata

    // send to our bucket

    console.log(uploadRes, " upload result");
    // upload object
  } else if (type === "audio") {
    data = {
      title: data.title,
      shortText: data.shortText,
      bannerUrl: data.bannerUrl,
      text: data.text,
      audio: data.audio,
    };

    console.log(data);
    const metadataForUs = {
      userAddress: address,
      banner: data.bannerURL,
      title: data.title,
      short_text: data.short_text,
    };

    // create metadata.

    const folderName = generateString(10);
    const folder = await client.object.createFolder(
      {
        bucketName: bucketName,
        creator: address,

        objectName: folderName + "/",
        visibility: "VISIBILITY_TYPE_PRIVATE",
      },
      signingData
    );

    const metadataResponse = await api.post("/checksums", metadataForUs, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const contentResponse = await api.post("/checksums", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // bannerURL => uPLOADED
    const metadataObject = await client.object.createObject(
      {
        bucketName: bucketName,
        contentLength: metadataResponse.data.contentLength,
        creator: address,
        expectCheckSums: JSON.parse(metadataResponse.data.expectCheckSums),
        fileType: "json",
        objectName: folderName + "/metadata.json",
        redundancyType: "REDUNDANCY_EC_TYPE",
        visibility: "VISIBILITY_TYPE_PUBLIC_READ",
      },
      signingData
    );

    const userTx = await client.object.createObject(
      {
        bucketName: bucketName,
        contentLength: contentResponse.data.contentLength,
        creator: address,
        expectCheckSums: JSON.parse(contentResponse.data.expectCheckSums),
        fileType: "json",
        objectName: folderName + "/content.json",
        redundancyType: "REDUNDANCY_EC_TYPE",
        visibility: data.visibility,
      },
      signingData
    );

    // upload audio
    // formt data
    let buffer = await data.audio.arrayBuffer()

 

    const formData = new FormData();
    formData.append("file",  new Blob([buffer], {
      type:"audio/wav",
    }));

    const audioResponse = await api.post("/checksums/audio", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(audioResponse, " audio response");
    const audioTx = await client.object.createObject(
      {
        bucketName: bucketName,
        contentLength: contentResponse.data.contentLength,
        creator: address,
        expectCheckSums: JSON.parse(contentResponse.data.expectCheckSums),
        fileType: "wav",
        objectName:
          folderName +
          "/audio." +
          data.audio.type.split("/")[1],
        redundancyType: "REDUNDANCY_EC_TYPE",
        visibility: data.visibility,
      },
      signingData
    );
    console.log(audioTx, " audio tx");

    const multitx = await client.txClient.multiTx([
      folder,
      metadataObject,
      userTx,
      audioTx,
    ]);
    const tx = await multitx.broadcast({
      ...broadcasting,
    });
  
  

    console.log("buff ", buffer)
    try {
      let newBuffered = Buffer.from(buffer.toString("utf8"))
    const audioUpload = await client.object.uploadObject(
      {
        bucketName: bucketName,
        objectName:
          folderName +
          "/audio." +
          data.audio.type.split("/")[1],
        body: newBuffered,
        txnHash: tx.transactionHash,
      },
      signingData
    );
    console.log(audioUpload, " audio upload");
    }catch(err){
      console.log(err)
    }
    console.log(tx, " tx");

    // upload audio$

    // create metadata for us

    //create object
  }
};
