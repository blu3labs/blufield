import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { BsLayoutTextWindowReverse} from "react-icons/bs";
import { AiOutlineAudio } from "react-icons/ai";
import { BiVideo } from "react-icons/bi";
import UserLogo from "@/assets/user.png";
import "./index.css";

function WalletButton() {
  let userPage = {
    visible: true,
    name: "test field 1",
    logo: "https://picsum.photos/200",
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="dropdownItems">

        <Link to="/create/text" className="myFieldButton dropItem">
          <BsLayoutTextWindowReverse className="dropdownIcon" />
          Text
        </Link>
           <Link to="/create/audio" className="myFieldButton dropItem">
          <AiOutlineAudio className="dropdownIcon" />
         Audio
       </Link>

       <Link to="/create/video" className="myFieldButton dropItem">
          <BiVideo className="dropdownIcon" />
         Video
       </Link>
        </div>
      ),
    },
    // {
    //   key: "2",
    //   label: (
    //     <Link to="/create/audio" className="myFieldButton">
    //       Create Audio
    //     </Link>
    //   ),
    // },
    // {
    //   key: "3",
    //   label: (
    //     <Link to="/create/video" className="myFieldButton">
    //       Create Video
    //     </Link>
    //   ),
    // },
  ];

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
                  {userPage.visible && (
                    <Dropdown
                      menu={{
                        items,
                      }}
                      placement="top"

                      onOpenChange={(e) => console.log(e)}
                      // open
                      
                    >
                      <button className="myFieldButton">Create Post</button>
                    </Dropdown>
                  )}
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