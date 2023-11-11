import React from "react";
import FieldMask from "@/components/fieldMask";
import "./index.css";

function AudioContent({ data, index }) {
  return (
    <div className="audioContent">
      {
        index % 2 === 0 && <FieldMask />
      }
      <img src={data.banner} alt="banner" draggable="false" />

      <div className="audioContentInfo">
        <div className="audioContentTitle">Lorem ipsum dolor sit.</div>
        <div className="audioContentDescription">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam,
          inventore.
        </div>
        <audio
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          controls
          controlsList="nodownload"
        />
        <div className="audioContentDate">
          11 November, 15:00
        </div>
      </div>
    </div>
  );
}

export default AudioContent;
