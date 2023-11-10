import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "./index.css";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 75) {
      setVisible(true);
    } else if (scrolled <= 75) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button className="topButton" onClick={scrollToTop}>
      <FaArrowCircleUp style={{ display: visible ? "inline" : "none" }} />
    </button>
  );
};

export default ScrollButton;
