import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import "./index.css";

function UploadVideo({ video, setVideo, className, text, iconClassName }) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const fileExtension = acceptedFiles[0]?.name
      ?.split(".")
      ?.pop()
      .toLowerCase();

    if (
      fileExtension !== "mp4" &&
      fileExtension !== "mov" &&
      fileExtension !== "wmv" &&
      fileExtension !== "flv" &&
      fileExtension !== "avi" &&
      fileExtension !== "avchd" &&
      fileExtension !== "webm" &&
      fileExtension !== "mkv"
    ) {
      toast.error("Please upload a valid video.");
      return;
    }
    setIsUploading(true);
    const fileSizeInBytes = acceptedFiles[0]?.size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    if (fileSizeInMB > 300) {
      toast.error("Please upload an video smaller than 300MB.");
      return;
    }

    setVideo(acceptedFiles[0]);

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);

    setIsUploading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isUploading,
    accept: "video/*",
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()} className={className}>
      <input {...getInputProps()} />
      {video ? (
        <video
          src={typeof video === "string" ? video : URL.createObjectURL(video)}
          alt="video"
          draggable="false"
          controls
          controlsList="nodownload"
          // autoPlay
          // loop
          // muted
        />
      ) : isUploading ? (
        <span>loading...</span>
      ) : isDragActive ? (
        <span>Drop the files here...</span>
      ) : (
        <>
          <RiUploadCloud2Fill className={iconClassName} />
          <span>{text}</span>
        </>
      )}
    </div>
  );
}

export default UploadVideo;
