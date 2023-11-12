import React, { useState } from "react";
import UploadImage from "@/components/upload/image";
import Input from "@/ui/input";
import Textarea from "@/ui/textarea";
import "./index.css";
import SelectBox from "../../../ui/selectBox";
import { CreateData } from "../../../utils/create";
import { useAccount, useSwitchNetwork, useNetwork } from "wagmi";
import { useNavigate, useParams } from "react-router-dom";
import { useSigner } from "../../../utils/useSigner";
import { getEddsaCompressedPublicKey } from "@bnb-chain/greenfield-zk-crypto";
import { api } from "../../../utils/api";
import toast from "react-hot-toast"
function CreateText() {
  const { id } = useParams();

  const [banner, setBanner] = useState(null);
  const [title, setTitle] = useState(null);
  const [shortText, setShortText] = useState(null);
  const [text, setText] = useState(null);
  const [visibility, setVisibility] = useState("Public");
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const signer = useSigner();
  const navigate = useNavigate();
  const { address, connector } = useAccount();
  const {} = useParams();



  const [loading, setLoading] = useState(false);

  const createText = async () => {
    setLoading(true);

    try{

      const bannerUrl = await uploadPhoto(banner);
      console.log(visibility);
      const d = await CreateData(
        id,
        address,
        await connector.getProvider(),
        chain.id,
        switchNetworkAsync,
        {
          bannerUrl,
          title,
          short_text: shortText,
          text,
          visibility:
          visibility === "Public"
          ? "VISIBILITY_TYPE_PUBLIC_READ"
          : "VISIBILITY_TYPE_PRIVATE",
        },
        "text"
        );
        if (d.includes("success")) {
          toast.success("Text Post added successfuly!")

        }
      }catch(e){
        console.log(e);
      }
      setLoading(false);
  };

  const uploadPhoto = async (img) => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      console.log("imggg");
      const { data: res } = await api.post("img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.url;
    } catch (error) {
      console.log(error);

      return "err";
    }
  };
  return (
    <div className="createPost">
      <div className="createPostTitle">Create Text</div>
      <UploadImage
        image={banner}
        setImage={setBanner}
        className="createPostBanner"
        iconClassName="createPostUploadIcon"
        text="Upload Banner"
      />

      <Input
        title="Title"
        placeholder="Enter Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Input
        title="Short Text"
        placeholder="Enter Short Text"
        name="text"
        value={shortText}
        onChange={(e) => setShortText(e.target.value)}
      />

      <Textarea
        title="Text"
        placeholder="Enter Text"
        rows={6}
        name="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <SelectBox
        title="Visibility"
        placeholder="Select Visibility"
        name="visibility"
        value={visibility}
        onChange={(e) => setVisibility(e)}
        options={[
          { value: "Public", label: "Public" },
          { value: "Subscribers", label: "Only Subscribers" },
        ]}
      />

      <button
        className="createPostButton"
        onClick={(e) => 
          createText()
        }

        disabled={loading}
        style={{
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.5 : 1,
        }}
      >
        Create Text{loading && "..."}
      </button>
    </div>
  );
}

export default CreateText;
