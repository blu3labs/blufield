import React from "react";
import ReactDOM from "react-dom/client";
import routes from "./routes";
import { RouterProvider } from "react-router-dom";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Buffer } from "buffer";
import {
  bsc,
  bscTestnet,
} from "wagmi/chains";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";
import "./reset.css";


window.Buffer = Buffer;


const { chains, publicClient } = configureChains(
  [bscTestnet],
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
