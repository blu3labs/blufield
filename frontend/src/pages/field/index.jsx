import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { TfiTwitter } from "react-icons/tfi";
import SubscriptionModal from "../../components/modals/subscription";
import NoLogo from "@/assets/user.png";
import DonateModal from "../../components/modals/donate";
import TextContent from "./components/textContent";
import VideoContent from "./components/videoContent";
import AudioContent from "./components/audioContent";
import "./index.css";
import { api } from "../../utils/api";
import { useAccount } from "wagmi";
import { getAddress } from "../../utils/getAddress";
import { client } from "../../utils/client";
import { getAllSps } from "../../utils/getAllSps";
import axios from "axios";
function Field() {
  const { id } = useParams();
  const { address } = useAccount();
  const [accentColor, setAccentColor] = useState("#00A9FF");

  const [data, setData] = useState({
    banner: false,
    logo: false,

    owner: false,
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--field-accent", accentColor);
  }, [accentColor]);

  let tabMenuItems = ["All Posts", "Texts", "Audios", "Videos"];

  const [activeTab, setActiveTab] = useState("All Posts");
  const [fieldDetails, setFieldDetails] = useState();
  const fetchFieldDetails = async () => {
    try {
      const { data: res } = await api.get(`user/${id}`);
      setFieldDetails(res.data);
      setAccentColor(res.data.accentColor);
    } catch (error) {
      console.log(error);
    }
  };
  const [posts, setPosts] = useState();
  const fetchPosts = async () => {
    try {
      const sps = await getAllSps(client);
      const res = await client.object.listObjects({
        bucketName: id,
        endpoint: sps[0].endpoint,
      });
      let posts = {
        metadata: [],
        content: [],
      };
      let data = [...res.body.GfSpListObjectsByBucketNameResponse.Objects];
      for (let i of data) {
        if (i.ObjectInfo.ContentType == "json") {
          if (i.ObjectInfo.ObjectName.includes("metadata")) {
            posts.metadata.push(i.ObjectInfo);
          } else {
            posts.content.push(i.ObjectInfo);
          }
        }
      }
      console.log(posts, "posts");
      for (let i in posts.metadata) {
        const res = await axios.get(
          `${sps[0].endpoint}/${id}/${posts.metadata[i].ObjectName}`
        );
        posts.metadata[i] = res.data;
      }
      console.log(posts, "posts");
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(posts, "alskdjklasjdlkasjd");
  useEffect(() => {
    fetchFieldDetails();
    fetchPosts();
  }, [id]);

  return (
    <div className="fiedlWrapper">
      <div className="fieldBanner">
        {fieldDetails?.banner !== "" && (
          <img src={fieldDetails?.banner} alt="banner" draggable="false" />
        )}
      </div>

      <div className="fieldTopArea">
        <div className="fieldLogo">
          {fieldDetails?.logo !== "" && (
            <img
              src={fieldDetails?.logo ?? NoLogo}
              alt="logo"
              draggable="false"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = NoLogo;
              }}
            />
          )}
        </div>
        {fieldDetails && fieldDetails?.owner == address ? (
          <Link to="/edit/field" className="editBtn">
            Edit
          </Link>
        ) : (
          <SubscriptionModal price={fieldDetails?.price} />
        )}
      </div>

      <div className="fieldBody">
        <div className="fieldLeftArea">
          <div className="fieldUserTitle">
            <span>{fieldDetails?.name}</span>
          </div>
          <div className="fieldUserShortInfo">15 Subs, 20 Posts</div>

          <div className="fieldUserAboutBox">
            <div className="fieldAboutTitle">About</div>
            <div className="fieldAboutContent">{fieldDetails?.about}</div>
            <div className="fieldSocials">
              {fieldDetails?.social_media?.email && (
                <a
                  href={fieldDetails?.social_media?.email}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HiOutlineMail className="fieldSocialIcon" />
                </a>
              )}
              {fieldDetails?.social_media?.twitter && (
                <a
                  href={fieldDetails?.social_media?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TfiTwitter className="fieldSocialIcon" />
                </a>
              )}
              {fieldDetails?.social_media?.github && (
                <a
                  href={fieldDetails?.social_media?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="fieldSocialIcon" />
                </a>
              )}
            </div>
          </div>
          <DonateModal owner={fieldDetails?.owner} />
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
            {posts &&
              posts?.metadata?.map(
                (item, index) => (
                  <TextContent
                    data={item}
                    key={index}
                    index={index}
                    content={posts?.content[index]}
                  />
                )
                // ) : index % 3 === 1 ? (
                //   <VideoContent data={data} key={index} index={index} />
                // ) : (
                //   <AudioContent data={data} key={index} index={index} />
                // )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Field;
