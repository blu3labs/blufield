import { useAccount } from "wagmi";

export const getAddress = () => {
  const { address } = useAccount();

  let currentAddress = address
    ? address
    : "0x0000000000000000000000000000000000000000";

  return currentAddress;
};
