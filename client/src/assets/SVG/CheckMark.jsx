import React from "react";

const CheckMark = ({ className, fill = "green" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path fill={fill} d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z" />
    </svg>
  );
};

export default CheckMark;
