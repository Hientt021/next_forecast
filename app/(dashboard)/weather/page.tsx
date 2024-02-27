import { Metadata } from "next";
import * as React from "react";
import WeatherPage from "./WeatherPage";

export interface IWeatherProps {}

export const metadata: Metadata = {
  title: "Weather",
};

export default function Weather(props: IWeatherProps) {
  return <WeatherPage />;
}
