
const { PermissionTypes, GRNToString, newGroupGRN, newObjectGRN } = require("@bnb-chain/greenfield-js-sdk");
require("dotenv").config();
const {client} = require("./config/client")



async function test() {


const walletAddr = process.env.WALLET_ADDRESS;
const pvkey ="0x"+ process.env.PRIVATE_KEY;

const auth = {
    type:"ECDSA",
    privateKey: pvkey
}
let bucketName = "gaydiri3"
const createBucket = await client.bucket.createBucket(
    {
        bucketName:bucketName,
        creator: walletAddr,
        visibility: "VISIBILITY_TYPE_PUBLIC_READ",
        chargedReadQuota:0,
        spInfo:{
            primarySpAddress: "0x89A1CC91B642DECbC4789474694C606E0E0c420b"
        }
    },auth
)

let groupName = "gaydirigubap2"
const createGroupTx = await client.group.createGroup({
    creator: walletAddr,
    groupName,
    extra:""

});
const mirrorGroupTx = await client.crosschain.mirrorGroup({
    groupName,
destChainId:97,
operator: walletAddr,
id:""
  });



const principal = {
  type: PermissionTypes.PrincipalType.PRINCIPAL_TYPE_GNFD_GROUP,
  value: GRNToString(newGroupGRN(walletAddr, groupName)),
};

const statement = {
  effect: PermissionTypes.Effect.EFFECT_ALLOW,
  actions: [PermissionTypes.ActionType.ACTION_TYPE_ALL],
  resources: [
    GRNToString(
     newObjectGRN(bucketName, '*'),
    ),
  ],
};

const policyTx = await client.bucket.putBucketPolicy(bucketName, {
  operator: walletAddr,
  statements: [statement],
  principal,
});

const { simulate, broadcast } = await client.txClient.multiTx([
    createBucket,
  createGroupTx,

  policyTx
]);

const tx = await broadcast({
    privateKey: pvkey,
    granter: walletAddr,
    payer: walletAddr,
    denom:"BNB", 
    gasLimit:1000000,
    gasPrice:5000000000

})

console.log("result tx ", tx)

}

test()