import React from "react";
import "./index.css";

function Textarea({ title, error, ...props }) {
  return (
    <div className="uiInputWrapper">
      <span>{title}</span>
      <textarea
        {...props}
        style={{
          borderColor: error  && `red`,
        }}
      />
      <p>{error}</p>
    </div>
  );
}

export default Textarea;
