"use client";
import { ICurrentForecast } from "@/app/weather/type";
import Image from "next/image";

interface IForecastIcon {
  size: number;
  data: ICurrentForecast;
}
const ForecastIcon = (props: IForecastIcon) => {
  const { data, size } = props;
  return Object.keys(data).length ? (
    <Image
      width={size}
      height={size}
      alt="weather-icon"
      src={require("@/public/images/weather_icons/" +
        data?.icon?.[0] +
        data?.icon?.[1] +
        ".png")}
    />
  ) : (
    <></>
  );
};

export default ForecastIcon;
