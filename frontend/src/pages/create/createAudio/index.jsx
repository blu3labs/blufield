import React, { useState } from "react";
import UploadImage from "@/components/upload/image";
import Input from "@/ui/input";
import UploadAudio from "@/components/upload/audio";
import SelectBox from "@/ui/selectBox";
import "./index.css";
import { CreateData } from "../../../utils/create";
import { api } from "../../../utils/api";
import { useAccount, useSwitchNetwork, useNetwork } from "wagmi";
import { useNavigate, useParams } from "react-router-dom";
import { useSigner } from "../../../utils/useSigner";
import toast from "react-hot-toast";

function CreateAudio() {
  const [banner, setBanner] = useState(null);
  const [title, setTitle] = useState(null);
  const [shortText, setShortText] = useState(null);
  const [audio, setAudio] = useState(null);
  const [visibility, setVisibility] = useState("Public");

  console.log(audio);

  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const signer = useSigner();
  const navigate = useNavigate();
  const { address, connector } = useAccount();
  const { id } = useParams();
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

  const [loading, setLoading] = useState(false);
  const createAudio = async () => {
    setLoading(true);

    try {
      const bannerUrl = await uploadPhoto(banner);
      const d = await CreateData(
        id,
        address,
        await connector.getProvider(),
        chain.id,
        switchNetworkAsync,
        {
          bannerUrl,
          title,
          shortText,
          audio,
          visibility:
            visibility === "Public"
              ? "VISIBILITY_TYPE_PUBLIC_READ"
              : "VISIBILITY_TYPE_PRIVATE",
        },
        "audio"
      );
      if (d.includes("success")) {
        toast.success("Audio added successfuly!");
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  return (
    <div className="createPost">
      <div className="createPostTitle">Create Audio</div>

      <div className="createPostAudioWrapper">
        <UploadImage
          image={banner}
          setImage={setBanner}
          className="createPostAudioBanner"
          iconClassName="createPostUploadIcon"
          text="Upload Thumbnail"
        />
        <div className="createPostAudioInputs">
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
          <UploadAudio
            audio={audio}
            setAudio={setAudio}
            className="createPostAudio"
            iconClassName="createPostAudioUploadIcon"
            text="Upload Audio"
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
        </div>
      </div>

      <button
        className="createPostButton"
        onClick={(e) => createAudio()}
        disabled={loading}
        style={{
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.5 : 1,
        }}
      >
        Create Audio{loading && "..."}
      </button>
    </div>
  );
}

export default CreateAudio;
