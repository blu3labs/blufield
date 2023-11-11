import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WalletButton from "../walletButton";
import "./index.css";
import { api } from "../../utils/api";

function Sidebar() {
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
  ];
  const [fields, setFields] = useState([]);
  const fetchNewsetFields = async () => {
    try {
      const { data: res } = await api.get("user");
      setFields(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewsetFields();
  }, []);
  console.log(fields, "fields");
  return (
    <div className="sidebar">
      <div className="sidebarTop">
        <Link to="/" className="sidebarHeader">
          Blufield
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
              {fields &&
                fields?.map((item, index) => (
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
