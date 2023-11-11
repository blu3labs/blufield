import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function TextContent({ data }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fieldTextContent" onClick={() => setOpen(!open)}>
      <img src={data.banner} alt="banner" draggable="false" />
      <div className="fieldTextContentTitle">Lorem ipsum dolor sit amet.</div>
      <div className="fieldTextContentShortText">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae hic
        vero voluptate?
      </div>
      {open && (
        <div className="fieldTextContentFullText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          neque, natus unde quam quibusdam totam, sunt laborum consequatur
          maxime ex accusamus! Rem animi qui totam veniam ab eum sequi non quod,
          possimus aliquam ullam placeat repellendus officiis consectetur
          molestiae magni ipsa sunt reprehenderit, maxime harum excepturi
          voluptatem. Nam, aspernatur laboriosam.
        </div>
      )}
      <div className="fieldTextContentDate">11 November, 23:40</div>
    </div>
  );
}

export default TextContent;
