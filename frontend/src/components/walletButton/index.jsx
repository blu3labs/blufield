import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { IoChevronDownOutline } from "react-icons/io5";
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
          <
            >
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
                  <button className="walletBtn">
                    My Field
                  </button>
                  <button className="walletBtn" onClick={openAccountModal}>
               
                      <span>{account.displayName}</span>
                      <IoChevronDownOutline className="downIcon" />
          
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
