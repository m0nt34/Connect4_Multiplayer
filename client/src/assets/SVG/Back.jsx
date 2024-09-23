import React from "react";

const Back = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        fill="white"
        d="M6.535 3h14.464a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.535a1 1 0 0 1-.833-.445l-5.333-8a1 1 0 0 1 0-1.11l5.333-8A1 1 0 0 1 6.535 3m6.464 7.586l-2.828-2.829l-1.414 1.415L11.585 12l-2.828 2.828l1.414 1.415l2.828-2.829l2.829 2.829l1.414-1.415L14.414 12l2.828-2.828l-1.414-1.415z"
      />
    </svg>
  );
};

export default Back;