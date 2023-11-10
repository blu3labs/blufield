import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { toast } from "react-hot-toast";
import "./index.css";

function UploadAudio({ audio, setAudio, className, text, iconClassName }) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const fileExtension = acceptedFiles[0]?.name
      ?.split(".")
      ?.pop()
      .toLowerCase();

    if (
      fileExtension !== "mp3" &&
      fileExtension !== "wav" &&
      fileExtension !== "wma" &&
      fileExtension !== "flac" &&
      fileExtension !== "aac" &&
      fileExtension !== "alac" &&
      fileExtension !== "aiff" &&
      fileExtension !== "dsd"
    ) {
      toast.error("Please upload a valid audio.");
      return;
    }
    setIsUploading(true);
    const fileSizeInBytes = acceptedFiles[0]?.size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    if (fileSizeInMB > 300) {
      toast.error("Please upload an audio smaller than 300MB.");
      return;
    }

    setAudio(acceptedFiles[0]);

    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);

    setIsUploading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: isUploading,
    accept: "audio/*",
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()} className={className}
    
     style={{
     borderRadius: audio && "24px",
     }}
    >
      <input {...getInputProps()} />
      {audio ? (
        <audio
          src={typeof audio === "string" ? audio : URL.createObjectURL(audio)}
          alt="audio"
          draggable="false"
          autoPlay
          loop
          muted
          controls
          controlsList="nodownload"
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

export default UploadAudio;
