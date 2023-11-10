import { ethers } from "ethers";
import { chainControl } from "./chainInfo";
import { multichainRpc } from "./multichain";

export const getNativeBalance = async (data) => {
  try {
    const { chain, address } = data;
    if (!chainControl(chain)) {
      throw new Error("chain not supported");
    }
    for (let i = 0; i < multichainRpc[chain]?.length; i++) {
      let provider = new ethers.providers.StaticJsonRpcProvider(
        multichainRpc[chain][i]
      );
      try {
        const balance = provider.getBalance(address);
        let result_ = await Promise.resolve(balance).then((res) => {
          return res;
        });
        return result_;
      } catch (error) {
        console.log(`${multichainRpc[chain][i]} failed to connect ${i}`);
      }
    }
  } catch (error) {
    console.log(error, "all rpc error");
    throw new Error(error);
  }
};
