import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Buffer } from "buffer";
import { bsc, bscTestnet } from "wagmi/chains";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";
import "./reset.css";
import { Greenfield } from "./utils/greenfieldInfo";
import { getEddsaCompressedPublicKey } from "@bnb-chain/greenfield-zk-crypto";

window.Buffer = Buffer;


bscTestnet.name = "BSC Testnet";

const greenfiels = {
  id: Greenfield.GREEN_CHAIN_ID,
  name: "Greenfield",
  network: "Greenfield",
  iconUrl: bscTestnet.iconUrl,
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB",
  },
  rpcUrls: {
    public: { http: [Greenfield.GREEN_CHAIN_NAME] },
    default: { http: [Greenfield.GREEN_CHAIN_NAME] },
  },
  blockExplorers: {
    default: { name: "GreenfieldScan", url: "https://testnet.greenfieldscan.com/" },
    etherscan: { name: "GreenfieldScan", url: "https://testnet.greenfieldscan.com/" },
  },
  testnet: true,
};

const { chains, publicClient } = configureChains(
  [bscTestnet,greenfiels],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "blufield",
  projectId: "834480d173f55344acdcdb1c2eec0815",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains} modalSize="compact">
      <RouterProvider router={routes} />
    </RainbowKitProvider>
  </WagmiConfig>
);
