import { ethers } from "ethers";
import { chainControl } from "./chainInfo";
import { multichainRpc } from "./multichain";

export const readContract = async (data) => {
  try {
    const { chain, address, abi, method, args } = data;

    if (!chainControl(chain)) {
      throw new Error("chain not supported");
    }

    let args_ = args;
    if (!args_) {
      args_ = [];
    }

    let contract = "";
    const get_contract = async (rpc_url) => {
      try {
        const provider_in = new ethers.providers.StaticJsonRpcProvider(rpc_url);

        return (contract = new ethers.Contract(address, abi, provider_in));
      } catch (error) {
        console.log(error);
        await new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 10000)
        );
      }
    };

    await Promise.race([
      get_contract(multichainRpc[chain][0]),
      get_contract(multichainRpc[chain][1]),
      get_contract(multichainRpc[chain][2]),

      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), 10000)
      ),
    ])
      .then((result) => {
        contract = result;
      })
      .catch((error) => {
        console.log(error);
      });

    const result_ = await contract?.[method](...args_);

    return result_;
  } catch (error) {
    console.log(error, "all rpc error");
    throw new Error(error);
  }
};
