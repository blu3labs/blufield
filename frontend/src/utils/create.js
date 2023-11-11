import { getEddsaCompressedPublicKey } from "@bnb-chain/greenfield-zk-crypto";
import { getOffchainAuthKeys } from "./auth";
import { client } from "./client";
import axios from "axios"
import { getCheckSums }  from "@bnb-chain/greenfiled-file-handle"

import {api} from "./api"


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
        let name = "ddd.json"
        console.log("hooo")
        // create object

        // uppload banner
        console.log(address, signer, switchNetworkAsync, chain)
        const auth = await getOffchainAuthKeys(address, signer, switchNetworkAsync, chain)
        console.log("auth",auth)
        const filedata = Buffer.from(JSON.stringify(data).toString("utf8"));
        // const { expectCheckSums, contentLength } = await getCheckSums(filedata);

  

        const req  = await api.post("/checksums", data, {
            headers: {
                "Content-Type": "application/json"
            }
        
        })
        console.log(req, "requesttttt")
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
            contentLength: req.data.contentLength   ,
            creator: address,
            expectCheckSums: JSON.parse(req.data.expectCheckSums),
            fileType: "json",
            objectName: name,
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
            objectName: name,
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