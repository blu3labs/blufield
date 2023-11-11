import { Client } from "@bnb-chain/greenfield-js-sdk";
import { Greenfield } from "./greenfieldInfo";
export const client = Client.create(
  Greenfield.GREEN_CHAIN_NAME,
  Greenfield.GREEN_CHAIN_ID,
  {
    zkCryptoUrl:
      "https://unpkg.com/@bnb-chain/greenfield-zk-crypto@0.0.3/dist/node/zk-crypto.wasm",
  }
);

