import { ethers } from "ethers";
import { useWalletClient } from "wagmi";

export const useSigner = () => {
  const { data: walletClient } = useWalletClient();

  if (!walletClient) return null;

  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain?.id,
    name: chain?.name,
    ensAddress: chain?.contracts?.ensRegistry?.address,
  };
  const provider = new ethers.providers.Web3Provider(transport, network);
  const signer = provider.getSigner(account.address);
  
  return signer;
};

