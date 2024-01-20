"use client";
import { callApi } from "@/src/api/callApi";
import {
  AIR_POLLUTION_API,
  FORECAST_API,
  UVI_API,
  WEATHER_API,
} from "@/src/api/const";
import { WEATHER_TOKEN } from "@/src/const/token";
import useNavigate from "@/src/hook/useNavigate";
import {
  addCurrentTime,
  date,
  getDayName,
  isUnixToday,
} from "@/src/lib/dayjs/date";
import {
  setForecast,
  setWeeklyList,
} from "@/src/lib/redux/features/app/appSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import { formatForecastData } from "@/src/utils/forecast";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AirConditions from "./AirConditions";
import TodayForecast from "./TodayForecast";
import WeeklyItem from "./WeeklyItem";
import { ICurrentForecast, IDailyForecast } from "./type";
import Loader from "@/src/components/Loader";

interface IWeeklyForecast {}

export enum VIEW_MODE {
  LIST = "list",
  CHART = "chart",
}
export default function WeeklyForecast(props: IWeeklyForecast) {
  const { unit, coordinate, forecast } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { onQueryChange, query } = useNavigate();
  const [weekly, setWeekly] = useState<IDailyForecast[]>([]);
  const [active, setActive] = useState(0);
  const [currentDt, setCurrentDt] = useState(0);
  const formatForecastList = (data: any) => {
    const dayArr: number[] = [];
    data?.forEach((el: any) => {
      const day = date.unix(el.dt).utc(false).startOf("day").unix();
      const alreadyAdded = dayArr.find((weekDay: any) => day === weekDay);
      if (!alreadyAdded) dayArr.push(day);
    });
    const formatArr: IDailyForecast[] = dayArr.map((el) => {
      const list: ICurrentForecast[] = data.filter((item: any) =>
        date.unix(item.dt).utc(false).isSame(date.unix(el), "day")
      );

      const tempSortedList = list.map((item) => item.temp).sort();
      const minTemp: number = tempSortedList[0];
      const maxTemp: number = tempSortedList[tempSortedList.length - 1];
      const day = date.unix(el).utc(false);

      return {
        date: day.isToday() ? "Today" : getDayName(day.format(), "en-US"),
        min: minTemp,
        max: maxTemp,
        icon: list[0].icon,
        list: list,
        dt: el,
      };
    });
    return formatArr;
  };

  useEffect(() => {
    const { latitude, longitude } = coordinate;
    if (latitude && longitude)
      (async () => {
        const weeklyForecast = await callApi(FORECAST_API, {
          units: unit,
          lat: coordinate?.latitude,
          lon: coordinate?.longitude,
          appid: WEATHER_TOKEN,
        });

        const currentForecast = await callApi(WEATHER_API, {
          units: unit,
          lat: coordinate?.latitude,
          lon: coordinate?.longitude,
          appid: WEATHER_TOKEN,
        });

        const uvIndex = await callApi(UVI_API, {
          lat: coordinate?.latitude,
          lon: coordinate?.longitude,
          appid: WEATHER_TOKEN,
        });

        const airQuality = await callApi(AIR_POLLUTION_API, {
          lat: coordinate?.latitude,
          lon: coordinate?.longitude,
          appid: WEATHER_TOKEN,
        });

        if (weeklyForecast && currentForecast && uvIndex && airQuality) {
          const formatCurrent = formatForecastData({
            ...currentForecast,
            dt: date.unix(currentForecast.dt).utc(true).unix(),
            airQuality: airQuality.list[0].main.aqi,
            uvIndex: uvIndex.value,
          });

          setCurrentDt(date.unix(currentForecast.dt).utc(true).unix());

          const sortedWeekly: ICurrentForecast[] = weeklyForecast.list
            .filter((el: any) =>
              date.unix(el.dt).utc(false).isSameOrAfter(date(), "day")
            )
            .map((el: any) => formatForecastData(el));

          const addedList = addCurrentTime(sortedWeekly, formatCurrent);
          const newWeekly = formatForecastList(addedList);
          setWeekly(newWeekly);
          onQueryChange({ ...query, dt: formatCurrent.dt });
          dispatch(setWeeklyList(addedList));
          dispatch(setForecast(formatCurrent));
        }
      })();
  }, [coordinate, unit]);
  return (
    <Loader loading={!currentDt} className="wrapper">
      <Grid container p={5} spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h5" fontWeight={600}>
            {"Welcome"}
          </Typography>
          <Typography variant="h6" fontWeight={500}>
            {"Check out today's weather information"}
          </Typography>
          <TodayForecast />
          <AirConditions />
        </Grid>
        <Grid
          item
          xs={2}
          className="scroll"
          sx={{
            overflow: "auto",
            height: "100vh",
            paddingBottom: 7,
            paddingRight: 1,
          }}
        >
          <Box display={"flex"} flexDirection={"column"}>
            {weekly.map((el: any, i: number) => {
              return (
                <WeeklyItem
                  key={i}
                  active={active === i}
                  onClick={() => {
                    setActive(i);

                    onQueryChange({
                      ...query,
                      dt: date.unix(el.list[0].dt).isToday()
                        ? currentDt
                        : el.list[0].dt,
                    });
                  }}
                  data={el}
                />
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Loader>
  );
}
