"use client";
import CardComponent from "@/src/components/CardComponent";
import DailyForecastChart from "@/src/components/chart/DailyForecastChart";
import useNavigate from "@/src/hook/useNavigate";
import { date } from "@/src/lib/dayjs/date";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AirConditions from "./AirConditions";
import { ICurrentForecast } from "./type";

interface ITodayForecast {
  currentList: ICurrentForecast[];
}

export default function TodayForecast(props: ITodayForecast) {
  const { currentList } = props;
  const { query, onQueryChange } = useNavigate();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (currentList) {
      currentList.forEach((el) =>
        console.log(date.unix(el.dt).format("DD MM HH:mm"))
      );
      const currentIndex = currentList.findIndex(
        (el) => el.airQuality && el.uvIndex
      );
      const result = currentIndex >= 0 ? currentIndex : 0;
      setActive(result);
      onQueryChange({ ...query, dt: currentList[result]?.dt });
    }
  }, [currentList]);

  return (
    <>
      <CardComponent mt={2} p={2}>
        <Typography fontWeight={600}>{"Today's Forecast"}</Typography>
        <DailyForecastChart
          data={currentList}
          active={active}
          onMarkerClick={setActive}
        />
      </CardComponent>
      <AirConditions currentData={currentList?.[active]} />
    </>
  );
}
