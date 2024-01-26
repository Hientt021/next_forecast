import React from "react";
import { IIconComponent } from ".";

function MistDayIcon(props: IIconComponent) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
    >
      <path
        d="M27.48 18c.33-.94.52-1.95.52-3a9 9 0 00-9-9c-4.28 0-7.86 2.99-8.77 7H9.5c-2.86 0-5.22 2.21-5.47 5h23.45z"
        className="st0"
      ></path>
      <path d="M4 22L18 22" className="st0"></path>
      <path d="M22 22L27 22" className="st0"></path>
      <path d="M8 26L22 26" className="st0"></path>
    </svg>
  );
}

export default MistDayIcon;
