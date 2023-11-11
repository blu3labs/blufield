import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import UserLogo from "@/assets/user.png";
import "./index.css";

function WalletButton() {
  let userPage = {
    visible: false,
    name: "test field 1",
    logo: "https://picsum.photos/200",
  };

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
                  {userPage.visible ? (
                    <Link to={"/" + userPage.name} className="myFieldButton">
                      <img
                        src={userPage.logo ?? UserLogo}
                        alt="avatar"
                        draggable="false"
                      />
                      <span>{userPage.name}</span>
                    </Link>
                  ) : (
                    <Link to="/create/field" className="myFieldButton">
                      Create Field
                    </Link>
                  )}
                  <button className="walletBtn" onClick={openAccountModal}>
                    <span>{account.displayBalance}</span>
                    <span>|</span>
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
