import { getEddsaCompressedPublicKey } from "@bnb-chain/greenfield-zk-crypto";
import { getOffchainAuthKeys } from "./auth";
import { client } from "./client";

import { getCheckSums }  from "@bnb-chain/greenfiled-file-handle"




let metadataFormat = {
    banner:"",
    title:"",
    short_text:"",
    text:"",
    visibility:""
}
export const CreateData = async (bucketName, address, signer,chain, switchNetworkAsync,data, type) => {


   

    console.log("hee", type, data)
    if (type === "text") {

        console.log("hooo")
        // create object

        // uppload banner
        console.log(address, signer, switchNetworkAsync, chain)
        const auth = await getOffchainAuthKeys(address, signer, switchNetworkAsync, chain)
        console.log("auth",auth)
        const filedata = Buffer.from(JSON.stringify(data).toString("utf8"));
        const { expectCheckSums, contentLength } = await getCheckSums(filedata);
        const signingData = {
            type: "EDDSA",
            seed: auth.seedString,
            domain: window.location.origin,
            address,
          };
        
          console.log("signnnnn")
        const userTx = await client.object.createObject(
          {
            bucketName: bucketName,
            contentLength: contentLength,
            creator: address,
            expectCheckSums: JSON.parse(expectCheckSums),
            fileType: "json",
            objectName: body.name + ".json",
            redundancyType: "REDUNDANCY_EC_TYPE",
            visibility: data.visibility,
          },
         signingData
        );
        const txHash = await userTx.broadcast({
          ...broadcast,
        });
    
        const uploadRes = await client.object.uploadObject(
          {
            bucketName: bucketName,
            objectName: body.name + ".json",
            body: filedata,
            txnHash: txHash.transactionHash,
          },
          signingData
        );



        // update partial part of metadata

        const metadataForUs = {
            userAddress: address,
            banner: data.banner,
            title: data.title,
            short_text: data.short_text
        }

        // send to our bucket

        console.log(uploadRes, " upload result")
        // upload object
    }
}