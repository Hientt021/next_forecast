import React from "react";
import { IIconComponent } from ".";

function ClearSkyDayIcon(props: IIconComponent) {
  const { size, color } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
    >
      <circle cx="16" cy="16" r="7" className="st0"></circle>
      <path d="M16 3L16 6" className="st0"></path>
      <path d="M6.81 6.81L8.93 8.93" className="st0"></path>
      <path d="M3 16L6 16" className="st0"></path>
      <path d="M6.81 25.19L8.93 23.07" className="st0"></path>
      <path d="M16 29L16 26" className="st0"></path>
      <path d="M25.19 25.19L23.07 23.07" className="st0"></path>
      <path d="M29 16L26 16" className="st0"></path>
      <path d="M25.19 6.81L23.07 8.93" className="st0"></path>
    </svg>
  );
}

export default ClearSkyDayIcon;
