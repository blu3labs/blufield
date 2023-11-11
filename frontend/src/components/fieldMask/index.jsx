import React from "react";
import SubscriptionModal from "@/components/modals/subscription";
import { AiOutlineLock } from "react-icons/ai";
import "./index.css";

function FieldMask() {
  return (
    <div className="fieldMask">
      <AiOutlineLock className="clockIcon" />
      <span>Subscribe to see this content</span>
      <SubscriptionModal />
    </div>
  );
}

export default FieldMask;