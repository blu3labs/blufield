import { getEddsaCompressedPublicKey } from "@bnb-chain/greenfield-zk-crypto";
import { getOffchainAuthKeys } from "./auth";
import { client } from "./client";
import axios from "axios"
import { getCheckSums }  from "@bnb-chain/greenfiled-file-handle"

import {api} from "./api"
const generateString = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
  
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  };

let metadataFormat = {
    banner:"",
    title:"",
    short_text:"",
    text:"",
    visibility:""
}
export const CreateData = async (bucketName, address, signer,chain, switchNetworkAsync,data, type) => {


   

    const broadcasting = {
        gasLimit:1000000,
        gasPrice:5000000000,
        granter: address,
        payer: address, denom: "BNB"
    }

    console.log("hee", type, data)
    if (type === "text") {
   
        console.log("hooo")

     
        // upload banner


        const auth = await getOffchainAuthKeys(address, signer, switchNetworkAsync, chain)

        const signingData = {
            type: "EDDSA",
            seed: auth.seedString,
            domain: window.location.origin,
            address,
          };
        const folderName = generateString(10)
        const folder = await client.object.createFolder({
            bucketName: bucketName,
            creator: address,
   
            objectName: folderName+"/",
            visibility: "VISIBILITY_TYPE_PRIVATE",
        
        },signingData)
        
      const tx =   await folder.broadcast({
     ...broadcasting

        })
        
        const metadataForUs = {
            userAddress: address,
            banner: data.banner,
            title: data.title,
            short_text: data.short_text
        }

        // create metadata.

        const metadataResponse  = await api.post("/checksums", metadataForUs, {
            headers: {
                "Content-Type": "application/json"
            }
        
        })
        const metadataObject = await client.object.createObject({
            
                bucketName: bucketName,
                contentLength: metadataResponse.data.contentLength   ,
                creator: address,
                expectCheckSums: JSON.parse(metadataResponse.data.expectCheckSums),
                fileType: "json",
                objectName: folderName+"/metadata.json",
                redundancyType: "REDUNDANCY_EC_TYPE",
                visibility: "VISIBILITY_TYPE_PUBLIC_READ",
              },
             signingData
        )
       const txMeta=  await metadataObject.broadcast({
            ...broadcasting
        })
        const metadatafile = Buffer.from(JSON.stringify(metadataForUs).toString("utf8"));
        const metadataUpload = await client.object.uploadObject(
            {
              bucketName: bucketName,
              objectName: folderName+"/metadata.json",
              body: metadatafile,
              txnHash: txMeta.transactionHash,
            },
            signingData
          );
  
          console.log("Metadata uploaded for us.")
        // folder: metadata.json    content.json



        // create object

        // uppload banner
        console.log(address, signer, switchNetworkAsync, chain)
        console.log("auth",auth)
        const filedata = Buffer.from(JSON.stringify(data).toString("utf8"));
        // const { expectCheckSums, contentLength } = await getCheckSums(filedata);

  

        const req  = await api.post("/checksums", data, {
            headers: {
                "Content-Type": "application/json"
            }
        
        })
        console.log(req, "requesttttt")
       
        
          console.log("signnnnn")
        const userTx = await client.object.createObject(
          {
            bucketName: bucketName,
            contentLength: req.data.contentLength   ,
            creator: address,
            expectCheckSums: JSON.parse(req.data.expectCheckSums),
            fileType: "json",
            objectName: folderName+"/content.json",
            redundancyType: "REDUNDANCY_EC_TYPE",
            visibility: data.visibility,
          },
         signingData
        );
        const txHash = await userTx.broadcast({denom:"BNB",
    
    gasLimit:1000000,
    gasPrice:5000000000,
    granter: address,
    payer: address
    })
    
        const uploadRes = await client.object.uploadObject(
          {
            bucketName: bucketName,
            objectName: folderName+"/content.json",
            body: filedata,
            txnHash: txHash.transactionHash,
          },
          signingData
        );



        // update partial part of metadata

     
        // send to our bucket

        console.log(uploadRes, " upload result")
        // upload object
    }
}