import React from "react";

const Chip = ({ blue = true }) => {
  return (
    <svg
      role="img"
      viewBox="0 0 100 100"
      className={`w-full ${
        blue
          ? "stroke-[#003c93] fill-[#0047ab]"
          : "stroke-[#b30000] fill-[#d50000]"
      }`}
    >
      <circle cx="50" cy="50" r="42" strokeWidth="5"></circle>
    </svg>
  );
};

export default Chip;
