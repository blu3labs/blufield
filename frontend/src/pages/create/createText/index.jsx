import React, { useState } from "react";
import UploadImage from "@/components/upload/image";
import Input from "@/ui/input";
import Textarea from "@/ui/textarea";
import "./index.css";

function CreateText() {
  const [banner, setBanner] = useState(null);
  const [title, setTitle] = useState(null);
  const [shortText, setShortText] = useState(null);
  const [text, setText] = useState(null);


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
    

      <button className="createPostButton">Create Text</button>
    </div>
  );
}

export default CreateText;
