import React,{useState,useEffect} from "react";
import FieldMask from "@/components/fieldMask";
import "./index.css";
import { getAllSps } from "../../../../utils/getAllSps";
import axios from "axios";
import { client } from "../../../../utils/client";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { getOffchainAuthKeys } from "../../../../utils/auth";
import moment from "moment"
function AudioContent({ data, index, content }) {
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
  return (
    <div className="audioContent">
     {content?.Visibility == 2 &&  <FieldMask />
      }
      <img src={data.banner} alt="banner" draggable="false" />

      <div className="audioContentInfo">
        <div className="audioContentTitle">{data.title}</div>
        <div className="audioContentDescription">
        {data.short_text}
        </div>
        <audio
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          controls
          controlsList="nodownload"
        />
        <div className="audioContentDate">
          {moment(data.created_date).format("DD MMMMM YYYY, HH:mm")}
        </div>
      </div>
    </div>
  );
}

export default AudioContent;
