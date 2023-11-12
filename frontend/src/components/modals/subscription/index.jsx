import React, { useState } from "react";
import { Modal } from "antd";
import "./index.css";

function SubscriptionModal({ price }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShow = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button className="fieldSubBtn" onClick={handleShow}>
        Subscribe
      </button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        closeIcon={null}
        footer={null}
        centered
        className="subDonateModal"
      >
        <div className="fieldDetailModal">
          <div className="fieldDetailTitle">Subscribe</div>

          <div className="subsDesc">
              Subscribe to this field to get access to all the content.
          </div>

          <button className="subBtn">
            <span>Subscribe</span>
            <span>|</span>
            <span>{price} BNB</span>
          </button>
        </div>
      </Modal>
    </>
  );
}

export default SubscriptionModal;
