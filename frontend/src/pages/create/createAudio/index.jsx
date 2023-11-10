import React, { useState } from "react";
import UploadImage from "@/components/upload/image";
import Input from "@/ui/input";
import UploadAudio from "@/components/upload/audio";
import "./index.css";

function CreateAudio() {
  const [banner, setBanner] = useState(null);
  const [title, setTitle] = useState(null);
  const [shortText, setShortText] = useState(null);
  const [audio, setAudio] = useState(null);

  console.log(audio);

  return (
    <div className="createPost">
      <div className="createPostTitle">Create Audio</div>

      <div className="createPostAudioWrapper">
        <UploadImage
          image={banner}
          setImage={setBanner}
          className="createPostAudioBanner"
          iconClassName="createPostUploadIcon"
          text="Upload Banner"
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
        </div>
      </div>

      <button className="createPostButton">Create Audio</button>
    </div>
  );
}

export default CreateAudio;
