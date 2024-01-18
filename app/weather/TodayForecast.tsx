"use client";
import CardComponent from "@/src/components/CardComponent";
import { date } from "@/src/lib/dayjs/date";
import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import ForecastByHour from "./ForecastByHour";
import DailyForecastChart from "@/src/components/chart/DailyForecastChart";
import { ICurrentForecast } from "./type";
import AirConditions from "./AirConditions";
import { useEffect, useState } from "react";
import Loader from "@/src/components/Loader";

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
