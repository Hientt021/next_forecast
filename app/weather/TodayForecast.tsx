"use client";
import CardComponent from "@/src/components/CardComponent";
import Loader from "@/src/components/Loader";
import DailyForecastChart from "@/src/components/chart/DailyForecastChart";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AirConditions from "./AirConditions";
import { ICurrentForecast } from "./type";

interface ITodayForecast {
  data: ICurrentForecast[];
  onChange: (value: any) => void;
}

export default function TodayForecast(props: ITodayForecast) {
  const { data, onChange } = props;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const currentIndex = data.findIndex((el) => el.uvIndex && el.airQuality);
    setActive(currentIndex > 0 ? currentIndex : 0);
    onChange(data[currentIndex > 0 ? currentIndex : 0]);
  }, [data]);

  return (
    <Loader loading={!data.length}>
      <CardComponent mt={4} p={3}>
        <Typography variant="h6" fontWeight={500}>
          {"Today's Forecast"}
        </Typography>
        <DailyForecastChart
          data={data}
          active={active}
          onMarkerClick={setActive}
        />
      </CardComponent>
      <AirConditions data={data[active]} />
    </Loader>
  );
}
