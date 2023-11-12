import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WalletButton from "../walletButton";
import "./index.css";
import { api } from "../../utils/api";

function Sidebar() {
  let newestFields = [
    {
      name: "SpaceNight",
      logo: "https://media.istockphoto.com/id/627281636/tr/foto%C4%9Fraf/earth-night-space.jpg?s=612x612&w=0&k=20&c=5qtSGG06t97vnUPVF74PM2sGGMXlPrh31GZqO2xPEBI=",
    },
    {
      name: "Danfo",
      logo: "https://www.boredpanda.com/blog/wp-content/uploads/2021/08/funny-frogs-3-61239cc65b109__700.jpg",
    },
  ];

  let subscribedFields = [
    {
      name: "Moziah",
      logo: "https://avatars.githubusercontent.com/u/87377842?v=4",
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
              {true &&
                newestFields?.map((item, index) => (
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
