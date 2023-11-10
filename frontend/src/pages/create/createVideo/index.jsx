import React, { useState } from "react";
import UploadImage from "@/components/upload/image";
import Input from "@/ui/input";
import UploadVideo from "@/components/upload/video";


function CreateVideo() {
  const [banner, setBanner] = useState(null);
  const [title, setTitle] = useState(null);
  const [shortText, setShortText] = useState(null);
  const [video, setVideo] = useState(null);

  console.log(video);

  return (
    <div className="createPost">
      <div className="createPostTitle">Create Video</div>

      <UploadVideo
        video={video}
        setVideo={setVideo}
        className="createPostBanner"
        iconClassName="createPostUploadIcon"
        text="Upload Video"
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

      <UploadImage
        image={banner}
        setImage={setBanner}
        className="createPostBanner"
        iconClassName="createPostUploadIcon"
        text="Upload Banner"
      />

      <button className="createPostButton">Create Video</button>
    </div>
  );
}

export default CreateVideo;
