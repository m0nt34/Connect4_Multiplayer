import React from "react";

const XMark = ({ className, fill = "white" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill={fill}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default XMark;
