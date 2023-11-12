import React, { useEffect, useState } from "react";
import FieldMask from "@/components/fieldMask";
import "./index.css";
import { getAllSps } from "../../../../utils/getAllSps";
import axios from "axios";
import { client } from "../../../../utils/client";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { getOffchainAuthKeys } from "../../../../utils/auth";
function TextContent({ data, index, content }) {
  const { address, connector } = useAccount();
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const [open, setOpen] = useState(false);
  const [postContent, setPostContent] = useState();
  const fetchContent = async () => {
    try {
      const sps = await getAllSps(client);
      const res = await axios.get(
        `${sps[0].endpoint}/${content.BucketName}/${content.ObjectName}`
      );
      setPostContent(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const privateSignature = async () => {
    try {
      const auth = await getOffchainAuthKeys(
        address,
        await connector?.getProvider(),
        switchNetworkAsync,
        chain?.id
      );

      const signingData = {
        type: "EDDSA",
        seed: auth.seedString,
        domain: window.location.origin,
        address,
      };
      const sps = await getAllSps(client);
      const getObject = await client.object.getObject(
        {
          bucketName: content.BucketName,
          objectName: content.ObjectName,
        },
        {
          ...signingData,
        }
      );
      setPostContent(JSON.parse(await getObject.body.text()));
      setOpen("show");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (content.Visibility == 1) {
      fetchContent();
    }
  }, [content]);
  console.log(data, "postContent");
  return (
    <div className="fieldTextContent">
      {content?.Visibility == 2 && <FieldMask />}
      <img src={data.banner} alt="banner" draggable="false" />
      <div className="fieldTextContentTitle">{data.title}</div>
      <div className="fieldTextContentShortText">{data.short_text}</div>
      {open && (
        <div className="fieldTextContentFullText">{postContent.text}</div>
      )}

      <button
        className="fieldTextContentBtn"
        onClick={() => {
          if (!postContent) {
            privateSignature();
            return;
          }
          setOpen(!open);
        }}
      >
        {open ? "Less" : "Show"}
      </button>
      <div className="fieldTextContentDate">11 November, 23:40</div>
    </div>
  );
}

export default TextContent;
