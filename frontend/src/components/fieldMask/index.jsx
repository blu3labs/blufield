import React from "react";
import SubscriptionModal from "@/components/modals/subscription";
import { AiOutlineLock } from "react-icons/ai";
import "./index.css";

function FieldMask({price , name}) {
  return (
    <div className="fieldMask">
      <AiOutlineLock className="clockIcon" />
      <span>Subscribe to see this content</span>
      <SubscriptionModal price={price} name={name} userIsSubscribed={false}/>
    </div>
  );
}

export default FieldMask;