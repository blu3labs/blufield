import {
  PermissionTypes,
  GRNToString,
  newGroupGRN,
  newObjectGRN,
} from "@bnb-chain/greenfield-js-sdk";
import { client } from "./client";
import { getOffchainAuthKeys } from "./auth";

async function multiTxCreateBucket(bucketName, address, signer, switchNetworkAsync,chain) {

  const auth = await getOffchainAuthKeys(address, signer,switchNetworkAsync,chain);

  const signingData = {
    type: "EDDSA",

    seed: auth.seedString,
    domain: window.location.origin,
    address,
  };

  const createBucket = await client.bucket.createBucket(
    {
      bucketName: bucketName,
      creator: address,
      visibility: "VISIBILITY_TYPE_PRIVATE",
      chargedReadQuota: 0,
      spInfo: {
        primarySpAddress: "0x89A1CC91B642DECbC4789474694C606E0E0c420b",
      },
    },
    signingData
  );

  let groupName = bucketName + "group";
  const createGroupTx = await client.group.createGroup({
    creator: address,
    groupName,
    extra: "",
  });

  const principal = {
    type: PermissionTypes.PrincipalType.PRINCIPAL_TYPE_GNFD_GROUP,
    value: GRNToString(newGroupGRN(address, groupName)),
  };

  const statement = {
    effect: PermissionTypes.Effect.EFFECT_ALLOW,
    actions: [
      PermissionTypes.ActionType.ACTION_GET_OBJECT,
      PermissionTypes.ActionType.ACTION_LIST_OBJECT,
    ],
    resources: [GRNToString(newObjectGRN(bucketName, "*"))],
  };

  const policyTx = await client.bucket.putBucketPolicy(bucketName, {
    operator: address,
    statements: [statement],
    principal,
  });

  const { simulate, broadcast } = await client.txClient.multiTx([
    createBucket,
    createGroupTx,
    policyTx,
  ]);

  const tx = await broadcast({
    granter: address,
    payer: address,
    denom: "BNB",
    gasLimit: 1000000,
    gasPrice: 5000000000,
  });

  console.log("result tx ", tx);
  let groupId = tx.events?.filter((e) => e.type === "greenfield.storage.EventCreateGroup")[0].attributes[1].value
  groupId = groupId.replace(/"/g, "");
  console.log("group id ", groupId);
  const mirrorGroupTx = await client.crosschain.mirrorGroup({
    groupName:"",
    destChainId: 97,
    operator: address,
    id: groupId,
  });

  await mirrorGroupTx.broadcast({
    granter: address,
    payer: address,
    denom: "BNB",
    gasLimit: 1000000,
    gasPrice: 5000000000,
  })


}

export default multiTxCreateBucket;
