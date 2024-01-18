"use client";
import { useAppSelector } from "@/src/lib/redux/store";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Coordinate from "./Coordinate";
import ForecastSider from "./ForecastSider";
import dynamic from "next/dynamic";
export interface ICoordinate {
  name?: string;
  longitude: string;
  latitude: string;
}

const WeeklyForecast = dynamic(() => import("./WeeklyForecast"), {
  ssr: false,
});

export default function WeatherPage() {
  return (
    <Box className="main">
      <Coordinate />
      <ForecastSider />

      <WeeklyForecast />
    </Box>
  );
}
