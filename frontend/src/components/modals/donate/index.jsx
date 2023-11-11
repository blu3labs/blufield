import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { getAddress } from "@/utils/getAddress";
import { getNativeBalance } from "@/utils/getNativeBalance";
import { useAccount } from "wagmi";
import BigNumer from "bignumber.js";
import "./index.css";

function DonateModal() {
  const { isConnected } = useAccount();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShow = () => {
    setIsModalOpen(true);
  };

  const address = getAddress();

  const [balance, setBalance] = useState(0);

  const getBalance = async () => {
    try {
      let res = await getNativeBalance({
        chain: 97,
        address: address,
      });

      let balance_ = new BigNumer(res?.toString(10)).div(10 ** 18).toString();

      setBalance(balance_);
    } catch (err) {
      console.log(err);
      setBalance(0);
    }
  };

  useEffect(() => {
    getBalance();

    let interval = setInterval(() => {
      getBalance();
    }, 7_000);

    return () => {
      clearInterval(interval);
    };
  }, [address]);

  return (
    <>
      <button className="fieldDonateBtn" onClick={handleShow}>
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
              <span>Amount</span>

              {isConnected && (
                <span>
                  Balance:{" "}
                  <b>
                    {balance
                      ? parseFloat(balance)?.toLocaleString("en-US")
                      : "-"}{" "}
                    BNB
                  </b>
                </span>
              )}
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

          <button className="subBtn">Submit</button>
        </div>
      </Modal>
    </>
  );
}

export default DonateModal;
