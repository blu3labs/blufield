import React from "react";
import "./index.css";

function Input({ title, error, ...props }) {
  return (
    <div className="uiInputWrapper">
      {title && <span>{title}</span>}
      <input
        {...props}
        style={{
          borderColor: error && `red`,
        }}
      />
      <p>{error}</p>
    </div>
  );
}

export default Input;
