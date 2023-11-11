import { getOffchainAuthKeys } from "./auth";
import { client } from "./client";
import {getCheckSums} from "@bnb-chain/greenfield-js-sdk"




let metadataFormat = {
    banner:"",
    title:"",
    short_text:"",
    text:"",
    visibility:""
}
export const CreateData = async (bucketName, address, signer, switchNetworkAsync,data, type) => {

    if (type === "text") {

        // create object

        const client = client
        const auth = getOffchainAuthKeys(address, signer, switchNetworkAsync)
        const filedata = Buffer.from(JSON.stringify(data).toString("utf8"));
        const { expectCheckSums, contentLength } = await getCheckSums(filedata);
        const signingData = {
            type: "EDDSA",
            seed: auth.seedString,
            domain: window.location.origin,
            address,
          };
        
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