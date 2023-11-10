import React from "react";
import { Link } from "react-router-dom";
import WalletButton from "../walletButton";
import Logo from "@/assets/iconLogo.png";
import "./index.css";

function Sidebar() {
  let subscribedFields = [
    {
      name: "Field 1",
      logo: "https://picsum.photos/200",
    },
    {
      name: "Field 2",
      logo: "https://picsum.photos/200",
    },
    {
      name: "Field 3",
      logo: "https://picsum.photos/200",
    },
    {
      name: "Field 3",
      logo: "https://picsum.photos/200",
    },
    {
      name: "Field 3",
      logo: "https://picsum.photos/200",
    },
    {
      name: "Field 3",
      logo: "https://picsum.photos/200",
    },
    {
      name: "Field 3",
      logo: "https://picsum.photos/200",
    },
  ];

  let newestFields = [
    {
      name: "Field 1",
      logo: "https://picsum.photos/200",
    },
    {
      name: "Field 2",
      logo: "https://picsum.photos/200",
    },
    {
      name: "Field 3",
      logo: "https://picsum.photos/200",
    },
    {
      name: "Field 3",
      logo: "https://picsum.photos/200",
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebarTop">
        <Link to="/" className="sidebarHeader">
          <img src={Logo} alt="logo" draggable="false" />
          <span>Blufield</span>
        </Link>

        <div className="sidebarBody">
          {subscribedFields?.length > 0 && (
            <div className="sidebarFieldsWrapper">
              <div className="sidebarFieldsTitle">Subscribed Fields</div>
              <div className="sidebarFieldsItems">
                {subscribedFields.map((item, index) => (
                  <Link
                    to={"/" + item.name}
                    className="sidebarFieldItem"
                    key={index}
                  >
                    <img src={item.logo} alt="logo" draggable="false" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="sidebarFieldsWrapper">
            <div className="sidebarFieldsTitle">Newest Fields</div>

            <div className="sidebarFieldsItems">
              {newestFields.map((item, index) => (
                <Link
                  to={"/" + item.name}
                  className="sidebarFieldItem"
                  key={index}
                >
                  <img src={item.logo} alt="logo" draggable="false" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
                  <div className="sidebarBottom">

      <WalletButton />
                  </div>
    </div>
  );
}

export default Sidebar;
