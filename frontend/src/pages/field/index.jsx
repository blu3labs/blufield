import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { TfiTwitter } from "react-icons/tfi";
import SubscriptionModal from "../../components/modals/subscription";
import NoLogo from "@/assets/user.png";
import "./index.css";
import DonateModal from "../../components/modals/donate";
import TextContent from "./components/textContent";

function Field() {
  const { id } = useParams();

  const [accentColor, setAccentColor] = useState("#00A9FF");

  const [data, setData] = useState({
    banner:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1200px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg",
    logo: "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt9beb50fc4d6cfd95/65132cf828dc21c7bca932c0/GOAL_-_Blank_WEB_-_Facebook_-_2023-09-26T201135.941.png?auto=webp&format=pjpg&width=3840&quality=60",

    owner: false,
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--field-accent", accentColor);
  }, [accentColor]);

  let tabMenuItems = ["All Posts", "Texts", "Videos", "Audios"];

  const [activeTab, setActiveTab] = useState("All Posts");

  return (
    <div className="fiedlWrapper">
      <div className="fieldBanner">
        {data?.banner !== "" && (
          <img src={data?.banner} alt="banner" draggable="false" />
        )}
      </div>
         

          
      <div className="fieldTopArea">
        <div className="fieldLogo">
          {data?.logo !== "" && (
            <img
              src={data?.logo ?? NoLogo}
              alt="logo"
              draggable="false"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = NoLogo;
              }}
            />
          )}
        </div>
        {data?.owner ? (
          <Link to="/edit/field" className="editBtn">
            Edit
          </Link>
        ) : (
          <SubscriptionModal />
        )}
      </div>

      <div className="fieldBody">
        <div className="fieldLeftArea">
          <div className="fieldUserTitle">
            <span>Arda Güler</span>
          </div>
          <div className="fieldUserShortInfo">15 Subs, 20 Posts</div>

          <div className="fieldUserAboutBox">
            <div className="fieldAboutTitle">About</div>
            <div className="fieldAboutContent">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium iure tempore magnam expedita quod iste at fuga officia
              inventore quas ducimus cum pariatur ea eveniet quaerat, atque
              repellat iusto?
            </div>
            <div className="fieldSocials">
              <a href="" target="_blank" rel="noopener noreferrer">
                <HiOutlineMail className="fieldSocialIcon" />
              </a>

              <a href="" target="_blank" rel="noopener noreferrer">
                <TfiTwitter className="fieldSocialIcon" />
              </a>

              <a href="" target="_blank" rel="noopener noreferrer">
                <FaGithub className="fieldSocialIcon" />
              </a>
            </div>
          </div>
          <DonateModal />
        </div>
        <div className="fieldRightArea">
          <div className="fieldRightTabMenus">
            {tabMenuItems.map((item, index) => (
              <button
                key={index}
                className={`fieldRightTabMenuItem ${
                  activeTab === item ? "fieldActiveTabItem" : ""
                }`}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="fieldContentsArea">
            

            <TextContent data={data} />
            <TextContent data={data} />
            <TextContent data={data} />
            <TextContent data={data} />
          </div>
        </div>
      </div>

      


    </div>
  );
}

export default Field;
