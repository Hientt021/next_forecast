"use client";
import api from "@/src/api/api";

import { WEATHER_TOKEN } from "@/src/const/token";
import useAlert from "@/src/hook/useAlert";
import useNavigate from "@/src/hook/useNavigate";
import { date } from "@/src/lib/dayjs/date";
import {
  setAllowAccessLocation,
  setCity,
} from "@/src/lib/redux/features/app/appSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import { formatForecastData } from "@/src/utils/forecast";
import { useEffect, useMemo, useState } from "react";
import ForecastSider from "./components/ForecastSider";
import WeeklyForecast from "./components/WeeklyForecast";
import { StyledWrapper } from "./styled";
import { ICurrentForecast } from "./type";
import { Grid } from "@mui/material";
import { getCurrentForecast, getWeeklyForecast } from "@/src/actions";
export interface ICoordinate {
  name?: string;
  longitude: string;
  latitude: string;
}

export default function WeatherPage() {
  const { unit, device } = useAppSelector((state) => state.app);
  const { isMobileDevice } = device;
  const { query, onQueryChange } = useNavigate();
  const { showAlert } = useAlert();
  const dispatch = useAppDispatch();
  const [weeklyData, setWeeklyData] = useState<ICurrentForecast[]>([]);
  const [loading, setLoading] = useState(true);

  const init = async (userCoordinate: ICoordinate, currentUnit: string) => {
    try {
      const currentForecast = await getCurrentForecast(
        userCoordinate,
        currentUnit
      );

      const weeklyForecast = await getWeeklyForecast(userCoordinate, unit);

      if (currentForecast && weeklyForecast) {
        const formatWeekly: ICurrentForecast[] = [
          currentForecast,
          ...weeklyForecast,
        ].sort((a, b) => a.dt - b.dt);
        setWeeklyData(formatWeekly);
        setLoading(false);
      }
    } catch (error: any) {
      showAlert(error, "error");
    }
  };

  const onAllowedAccessLocation = async (location: GeolocationPosition) => {
    dispatch(setAllowAccessLocation(true));
    const latitude = location.coords.latitude.toString();
    const longitude = location.coords.longitude.toString();
    if (latitude && longitude) onQueryChange({ ...query, latitude, longitude });
  };

  const onDeniedAccessLocation = async (error: GeolocationPositionError) => {
    dispatch(setAllowAccessLocation(false));
    showAlert("Please choose a city", "info");
    setLoading(false);
  };

  useEffect(() => {
    if (query?.latitude && query?.longitude) init(query, unit);
    else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onAllowedAccessLocation,
        onDeniedAccessLocation
      );
    }
  }, [query?.latitude, query?.longitude, unit]);

  const currentData = useMemo(() => {
    return weeklyData.find((el) => el.dt === Number(query?.dt));
  }, [query?.dt, weeklyData]);

  return (
    <Grid container height={"100vh"} overflow="hidden">
      <Grid
        item
        mobile={12}
        laptop={3}
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          p: isMobileDevice ? 2 : 5,
          position: "relative",
        }}
      >
        <ForecastSider data={currentData} />
      </Grid>
      <Grid
        item
        mobile={12}
        laptop={9}
        p={5}
        pr={1}
        rowGap={2}
        sx={{
          backgroundColor: isMobileDevice ? "transparent" : "#E3F1FF",
          borderBottomLeftRadius: "6rem",
          borderTopLeftRadius: "6rem",
          height: "100vh",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        <WeeklyForecast weeklyData={weeklyData} />
      </Grid>
    </Grid>
  );
}
