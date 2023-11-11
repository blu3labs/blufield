import React, { useState } from "react";
import UploadImage from "@/components/upload/image";
import Input from "@/ui/input";
import Textarea from "@/ui/textarea";
import "./index.css";
import SelectBox from "../../../ui/selectBox";
import { CreateData } from "../../../utils/create";
import { useAccount, useSwitchNetwork, useNetwork } from "wagmi";
import { useNavigate } from "react-router-dom";

function CreateText() {
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

  const createText = async () => {
    const d = await CreateData(
      "texts",
      address,
      signer,
      switchNetworkAsync,
      {
        banner,
        title,
        shortText,
        text,
        visibility: visibility === "Public" ? "d": "VISIBILITY_TYPE_PRIVATE",
      },
      "text"
    
    )

  }
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

    

      <button className="createPostButton" onClick={(e) => {
        createText()
      }} >Create Text</button>
    </div>
  );
}

export default CreateText;
