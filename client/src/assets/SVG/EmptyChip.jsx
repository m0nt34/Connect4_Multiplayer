import React from "react";

const EmptyChip = () => {
  return (
    <svg
      role="img"
      viewBox="0 0 100 100"
      className="w-full stroke-white dark:stroke-slate-800 fill-white dark:fill-slate-800"
    >
      <circle cx="50" cy="50" r="42"></circle>
    </svg>
  );
};

export default EmptyChip;
