import React from "react";
import { IIconComponent } from ".";

function CityBuilding(props: IIconComponent) {
  const { size = 500, color = "#000" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      version="1.1"
      viewBox="0 0 58.137 58.137"
      xmlSpace="preserve"
    >
      <path d="M47.815 49.001c-.028-3.53-.073-20.329 1.571-26.652l-6.257-5.151v30.587c-.362-.073-.724-.146-1.104-.214V17.196l-7.176 4.784c.934 4.16 1.362 18.671 1.508 24.857-.402-.033-.816-.062-1.231-.091.011-1.795.04-3.6.104-5.409a456.286 456.286 0 00-.33-8.197l-1.209-.381v-2.841h1.024c-.212-3.338-.479-6.208-.811-7.686l-.174-.774 1.687-1.125-1.307-.418.464-2.508 1.758.555-.224 1.911.892-.595c.751-6.372 1.438-10.637 1.438-10.637l-8.556-6.808v44.702c-.283-.002-.549.002-.827.002V1.19l-9.568 7.359s.331 2.181.785 5.768l2.188 1.626v-2.036l1.982-.749v2.372l-1.465.797 2.155 1.604-.203.759c-1.045 3.893-1.873 12.321-2.422 19.414.166 2.862.267 5.763.326 8.643a66.87 66.87 0 00-1.626.14c.384-6.485 1.465-22.537 3.063-28.497l-7.543-5.611v34.729c-.373.067-.748.133-1.104.205V12.781L8.173 18.3c1.907 6.549 2.542 26.762 2.65 30.695C1.676 52.075 0 56.947 0 56.947h58.137s-.981-4.864-10.322-7.946zM35.072 8.745l2.162 1.019-.302 2.643-2.102-.78.242-2.882zm-.241 4.083l1.981.811-.421 2.973-1.816-.721.256-3.063zm-12.371-.42l-.601-2.522 2.042-1.07.541 2.812-1.982.78zm-1.261 6.005l1.875 1.007-.389 1.875-1.618-.479.132-2.403zm-.27 3.424l1.562.39-.179 2.073-1.381-.543-.002-1.92zm-.18 3.017l1.384.559-.152 2.338-1.382-.667.15-2.23zm-.293 3.386l1.224.226-.15 2.063-1.074-.347V28.24zm-.248 3.144h1.322v2.321l-1.322-.1v-2.221zm-.63 11.706l-1.441-.361v-2.402l1.441.6v2.163zm0-3.31l-1.441-.362v-2.402l1.441.602v2.162zm0-3.311l-1.441-.36v-2.403l1.441.602v2.161zm0-3.311l-1.441-.36v-2.402l1.441.601v2.161zm0-3.311l-1.441-.36v-2.403l1.441.601v2.162zm0-3.31l-1.441-.362v-2.403l1.441.601v2.164zm0-3.31l-1.441-.361v-2.402l1.441.6v2.163zm0-3.311l-1.441-.361v-2.403l1.441.601v2.163zm1.351 23.174h-.946v-2.068h.946v2.068zm0-3.31h-.946v-2.068h.946v2.068zm0-3.311h-.946v-2.067h.946v2.067zm2.973-10.248l1.217-.692.225 2.948-1.441.207v-2.463zm1.756 14.8h-1.037v-2.746h1.037v2.746zm0-4.097l-1.215.182v-3.02l1.215-.226v3.064zm-1.216-4.342v-2.504l.9-.27.315 2.688-1.215.086zm3.424 8.051l-1.201.572v-3.064l1.201-.689v3.181zm0-4.384l-1.201.674V33.86l1.201-.794v3.183zm0-4.383l-1.201.631v-3.063l1.201-.749v3.181zm0-4.385l-1.472.66V25.08l1.472-.78v3.181zm0-4.383l-1.622.66v-3.062l1.622-.779v3.181zm0-4.384l-1.622.57v-3.062l1.622-.69v3.182zm0-4.384l-1.801.841v-3.063l1.801-.96v3.182zm0-4.384l-2.042.78V7.664l2.042-.9v3.182zm3.376-3.183l2.118 1.2v2.906l-2.118-1.104V6.763zm1.038 34.442l-1.038-.36v-2.93l1.038.36v2.93zm0-4.281l-1.038-.38V32.82l1.038.657v3.447zm.318-4.428l-1.354-.962v-3.057l1.354 1.016v3.003zm0-4.354l-1.354-1.005v-3.002l1.354 1.103v2.904zm.192-4.573l-1.548-.775v-3.002l1.548.872v2.905zm.151-4.154l-1.699-.964v-3.002l1.699 1.062v2.904zm0-4.53l-1.699-.776v-3.002l1.699.873v2.905zm1.44 26.32l-1.037-.36v-2.93l1.037.36v2.93zm.196-4.1l-1.096-.182v-2.928l1.096.239v2.871zM46.421 22.32l1.577.754v1.779l-1.577-.901V22.32zm-.315 11.109l1.066.379v1.778l-1.066-.523v-1.634zm0 2.876l1.066.377v1.778l-1.066-.522v-1.633zm0 2.876l1.066.377v1.779l-1.066-.522v-1.634zm-.901 5.89l-1.26-.495v-2.004l1.26.61v1.889zm0-2.688l-1.26-.496v-2.002l1.26.61v1.888zm0-2.688l-1.26-.496v-2.002l1.26.609v1.889zm0-2.687l-1.26-.497v-2.002l1.26.608v1.891zm0-2.687l-1.26-.496v-2.004l1.26.608v1.892zm0-2.688l-1.26-.495v-2.005l1.26.61v1.89zm0-2.688l-1.26-.496v-2.004l1.26.61v1.89zm0-2.687l-1.26-.496v-2.004l1.26.611v1.889zm0-2.689l-1.26-.495V21.07l1.26.611v1.888zm2.117 20.455l-1.216-.336v-1.634l1.216.192v1.778zm0-11.138l-1.216-.699v-1.633l1.216.553v1.779zm.361-2.674l-1.577-.689v-1.844l1.577.754v1.779zm0-2.688l-1.577-.901V24.99l1.577.755v1.779z"></path>
    </svg>
  );
}

export default CityBuilding;
