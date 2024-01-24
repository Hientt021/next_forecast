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
import ForecastSider from "./ForecastSider";
import WeeklyForecast from "./WeeklyForecast";
import { StyledWrapper } from "./styled";
import { ICurrentForecast } from "./type";
export interface ICoordinate {
  name?: string;
  longitude: string;
  latitude: string;
}

export default function WeatherPage() {
  const { unit, device } = useAppSelector((state) => state.app);
  const { isMobile, isIpad, isDesktop } = device;
  const { query, onQueryChange } = useNavigate();
  const { showAlert } = useAlert();
  const dispatch = useAppDispatch();
  const [weeklyData, setWeeklyData] = useState<ICurrentForecast[]>([]);
  const [loading, setLoading] = useState(true);

  const init = async (userCoordinate: ICoordinate, currentUnit: string) => {
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
  };

  const getCurrentForecast = async (
    userCoordinate: ICoordinate,
    currentUnit: string
  ) => {
    try {
      const { latitude, longitude } = userCoordinate;

      const currentForecast = await api.getTodayForecast({
        units: currentUnit,
        lat: latitude,
        lon: longitude,
      });

      const uvIndex = await api.getUvIndex({
        lat: latitude,
        lon: longitude,
      });

      const airQuality = await api.getAirQuality({
        lat: latitude,
        lon: longitude,
      });

      if (currentForecast && uvIndex && airQuality) {
        const formatCurrent = formatForecastData({
          ...currentForecast,
          airQuality: airQuality.list[0].main.aqi,
          uvIndex: uvIndex.value,
        });
        dispatch(setCity(currentForecast.name));
        return formatCurrent;
      }
    } catch (error: any) {
      showAlert(error, "error");
    }
  };

  const getWeeklyForecast = async (
    userCoordinate: ICoordinate,
    currentUnit: string
  ) => {
    try {
      const weeklyForecast = await api.getWeeklyForecast({
        units: currentUnit,
        lat: userCoordinate?.latitude,
        lon: userCoordinate?.longitude,
      });

      if (weeklyForecast) {
        const sortedWeekly: ICurrentForecast[] = weeklyForecast.list
          .map((el: any) => formatForecastData(el))
          .filter((el: any) =>
            date.unix(el.dt).isSameOrAfter(date().startOf("day"), "day")
          );

        return sortedWeekly;
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
    showAlert("Please choose a city");
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
    <StyledWrapper
      isMobile={isMobile}
      isIpad={isIpad}
      loading={loading}
      className="main"
      p={isDesktop ? 0 : 2}
    >
      <ForecastSider data={currentData} />
      <WeeklyForecast weeklyData={weeklyData} />
    </StyledWrapper>
  );
}
