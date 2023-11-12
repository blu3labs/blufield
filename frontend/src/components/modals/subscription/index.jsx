import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "./index.css";
import { bluefieladdress, bluefieldAbi } from "../../../contract/bluefield";
import BigNumber from "bignumber.js";
import { useSigner } from "../../../utils/useSigner";
import { writeContract } from "../../../utils/writeContract";
import { useSwitchNetwork } from "wagmi";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import { getAddress } from "@/utils/getAddress";
import { readContract } from "../../../utils/readContract";

function SubscriptionModal({ price, name }) {
  const { switchNetworkAsync } = useSwitchNetwork();
  const signer = useSigner();
  const address = getAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleShow = () => {
    setIsModalOpen(true);
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!signer) {
      toast.error("Please connect wallet");
      return;
    }

    if (!name) {
      toast.error("Something went wrong");
      return;
    }

    setLoading(true);
    try {
      let val = new BigNumber(price)
        .plus(0.01)
        .multipliedBy(10 ** 18)
        .toString(10);

      console.log(val, "val", price, name);

      let context = {
        signer: signer,
        address: bluefieladdress[97],
        abi: bluefieldAbi,
        method: "subscribeField",
        args: [name],
        val: val,
        message: "Subscription Successful",
        chainId: 97,
        switchNetworkAsync: switchNetworkAsync,
      };

      await writeContract(context);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const [userIsSubscribed, setUserIsSubscribed] = useState(false);

  const getIsSubscribed = async () => {
    try {
      let context = {
        chain: 97,
        address: bluefieladdress[97],
        abi: bluefieldAbi,
        method: "isSubscribed",
        args: [address, name],
      };

      let res = await readContract(context);

      console.log(res, "res 1");

      setUserIsSubscribed(res);
    } catch (error) {
      console.log(error);
      setUserIsSubscribed(false);
    }
  };

  useEffect(() => {
    getIsSubscribed();

    let interval = setInterval(() => {
      getIsSubscribed();
    }
    , 10_000);

    return () => {
      clearInterval(interval);
    };

  }, [address, name]);

  return (
    <>
      <button className="fieldSubBtn" onClick={handleShow}
        disabled={userIsSubscribed}

        style={{
          cursor: userIsSubscribed ? "not-allowed" : "pointer",
        }}
      >
        {
          userIsSubscribed ? "Subscribed" : "Subscribe"
        }
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

          <button
            className="subBtn"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
            }}
          >
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
