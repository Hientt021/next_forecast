"use client";
import CardComponent from "@/src/components/CardComponent";
import Loader from "@/src/components/Loader";
import DailyForecastChart from "@/src/components/chart/DailyForecastChart";
import { Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import AirConditions from "./AirConditions";
import { ICurrentForecast } from "./type";
import { useAppSelector } from "@/src/lib/redux/store";
import {
  addCurrentTime,
  date,
  isSameUnixDate,
  isUnixToday,
} from "@/src/lib/dayjs/date";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useNavigate from "@/src/hook/useNavigate";

interface ITodayForecast {}

export default function TodayForecast(props: ITodayForecast) {
  const { list } = useAppSelector((state) => state.app.forecast);
  const { onQueryChange, query } = useNavigate();
  const pathname = usePathname();
  const search = useSearchParams();
  const dt = Number(query?.dt);

  const data = useMemo(() => {
    console.log(list.filter((el) => isSameUnixDate(el.dt, dt)));
    return list.filter((el) => isSameUnixDate(el.dt, dt));
  }, [query, list]);

  const index = useMemo(() => data.findIndex((el) => el.dt === dt), [dt, data]);

  return (
    <CardComponent mt={4} p={3}>
      <Typography variant="h6" fontWeight={500}>
        {"Today's Forecast"}
      </Typography>
      <DailyForecastChart
        data={data}
        active={index}
        onMarkerClick={(i) => onQueryChange({ ...query, dt: data[i].dt })}
      />
    </CardComponent>
  );
}
