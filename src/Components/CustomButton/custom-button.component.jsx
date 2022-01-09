import React from "react";

import "./custom-button.style.scss";

const CustomButton = ({ children, ...otherProps }) => {
  return (
    <button
      className={'custom-button'}
      {...otherProps}
    >
      {" "}
      {children}{" "}
      Upload
    </button>
  );
};

export default CustomButton;
