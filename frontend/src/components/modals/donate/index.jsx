import React, { useState } from "react";
import { Modal } from "antd";
import "./index.css";

function DonateModal() {
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
        Donate
      </button>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        closeIcon={null}
        footer={null}
        centered
      >
        <div className="fieldDetailModal">
          <div className="fieldDetailTitle">Donate</div>

         <div className="donateInputWrapper">
          <div className="donateInputHeader">
            <span>
              Amount
            </span>
            <span>
              Balance: <b>14.99 BNB</b>
            </span>
          </div>

          <div className="donateInput">
            <input 
              type="number"
              placeholder="0.01"
              onKeyPress={(event) => {
                if (!/[0-9+.]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            <span>BNB</span>
          </div>
         </div>

          <button className="subBtn">
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
}

export default DonateModal;
