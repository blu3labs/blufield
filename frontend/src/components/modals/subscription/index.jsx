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
            All the content you create will be available to your subscribers.
            You can set the price of your subscription. You can also
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
