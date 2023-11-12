import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { getAddress } from "@/utils/getAddress";
import { getNativeBalance } from "@/utils/getNativeBalance";
import { useAccount } from "wagmi";
import BigNumer from "bignumber.js";
import { useSigner } from "@/utils/useSigner";
import { useSwitchNetwork } from "wagmi";
import { writeContract } from "@/utils/writeContract";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";

import "./index.css";

function DonateModal({owner}) {
  const { isConnected } = useAccount();

  const signer = useSigner();
  const { chain } = useNetwork();

  const { switchNetworkAsync } = useSwitchNetwork();

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

  const [amount, setAmount] = useState(null);



  const [loading, setLoading] = useState(false);
  const handleDonate = async () => {
    if (!signer) {
      toast.error("Please connect wallet");
      return;
    }

    if (
      amount === null ||
      amount === undefined ||
      amount === "" ||
      parseFloat(amount) <= 0
    ) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      const tx = await signer?.sendTransaction({
        to: owner,
        value: ethers.utils.parseUnits(amount, "ether"),
      });

      await tx.wait();

      console.log(tx);

      toast.success("Donation successful");
    } catch (error) {
      console.log(error);
      toast.error(
        error
          ? error.reason !== undefined
            ? error.reason?.includes("execution reverted")
              ? error.reason?.split("execution reverted:")[1]
              : error.reason
            : error.message !== undefined
            ? error.message === "Internal JSON-RPC error."
              ? "Insufficient Balance"
              : error.message
            : "Something went wrong"
          : "Something went wrong"
      );
    }
    setLoading(false);
  };


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
        className="subDonateModal"
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <span>BNB</span>
            </div>
          </div>

          <button
            className="subBtn"
            onClick={() => handleDonate()}
            disabled={loading}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </Modal>
    </>
  );
}

export default DonateModal;
