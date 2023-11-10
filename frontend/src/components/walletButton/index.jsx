import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import UserLogo from "@/assets/user.png"
import "./index.css";

function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} className="connectBtn">
                    Connect
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    className="connectBtn wrongNetworkBtn"
                  >
                    Wrong Network
                  </button>
                );
              }

              return (
                <div className="walletWrapper">
                  <Link to="/create-field" className="myFieldButton">Create Field</Link>
                  <button className="walletBtn" onClick={openAccountModal}>
                    <img src={UserLogo} alt="avatar" draggable="false"/>
                    <span>{account.displayName}</span>
                  </button>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default WalletButton;
