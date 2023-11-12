import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { BsLayoutTextWindowReverse } from "react-icons/bs";
import { AiOutlineAudio } from "react-icons/ai";
import { BiVideo } from "react-icons/bi";
import UserLogo from "@/assets/user.png";
import { bluefieladdress, bluefieldAbi } from "@/contract/bluefield";
import { readContract } from "@/utils/readContract";

import { getAddress } from "@/utils/getAddress";
import "./index.css";
import { api } from "../../utils/api";

function WalletButton() {
  let userPage_ = {
    visible: true,
    name: "Danfo",
    logo: "https://www.boredpanda.com/blog/wp-content/uploads/2021/08/funny-frogs-3-61239cc65b109__700.jpg",
  };

  const address = getAddress();

  const [userPage, setUserPage] = useState({
    visible: false,
    name: "",
    logo: "",
  });

  const fetchUserPage = async () => {
    try {
      let context = {
        chain: 97,
        address: bluefieladdress[97],
        abi: bluefieldAbi,
        method: "userField",
        args: [address],
      };

      let res = await readContract(context);
      console.log(res, "res 1");
      if (res.length > 0) {
        let res2 = await api.get("user/" + res);

        console.log(res2, "res 2");

        setUserPage({
          visible: true,
          name: res,
          logo: res2.data?.data?.logo,
        });
      } else {
        setUserPage({
          visible: false,
          name: "",
          logo: "",
        });
      }
    } catch (error) {
      console.log(error);
      setUserPage({
        visible: false,
        name: "",
        logo: "",
      });
    }
  };

  useEffect(() => {
    fetchUserPage();
  }, [address]);

  const items = [
    {
      key: "1",
      label: (
        <div className="dropdownItems">
          <Link
            to={"/create/text/" + userPage.name}
            className="myFieldButton dropItem"
          >
            <BsLayoutTextWindowReverse className="dropdownIcon" />
            Text
          </Link>
          <Link
            to={"/create/audio/" + userPage.name}
            className="myFieldButton dropItem"
          >
            <AiOutlineAudio className="dropdownIcon" />
            Audio
          </Link>

          <Link
            to={"/create/video/" + userPage.name}
            className="myFieldButton dropItem"
          >
            <BiVideo className="dropdownIcon" />
            Video
          </Link>
        </div>
      ),
    },
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
