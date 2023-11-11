import React, { useState } from "react";
import { Modal } from "antd";
import VideoPlayIcon from "@/assets/playIcon.png";
import FieldMask from "@/components/fieldMask";
import "./index.css";

function VideoContent({ data, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShow = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="videoContent">
        {
          index % 2 === 0 && <FieldMask />
        }
        <button className="videoContentBanner" onClick={handleShow}>
          <img src={data.banner} alt="banner" draggable="false" />
          <img src={VideoPlayIcon} alt="play" draggable="false" />
        </button>

        <div className="videoContentInfo">
          <span>Lorem ipsum dolor sit amet.</span>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            magnam!
          </span>
          <span>18 November, 23:59</span>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        closeIcon={null}
        footer={null}
        centered

        className="videoModal"
      >

        <div className="videoModal">

        <video
          src="https://gnfd-testnet-sp1.bnbchain.org/view/testfrombackaf/testvideo2.mp4"
          controls
          controlsList="nodownload"
          autoPlay
          width="100%"
          height="100%"
          />
          </div>
      </Modal>
    </>
  );
}

export default VideoContent;
