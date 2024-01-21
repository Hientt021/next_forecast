"use client";
import { callApi } from "@/src/api/callApi";
import {
  AIR_POLLUTION_API,
  FORECAST_API,
  UVI_API,
  WEATHER_API,
} from "@/src/api/const";
import Loader from "@/src/components/Loader";
import { WEATHER_TOKEN } from "@/src/const/token";
import useNavigate from "@/src/hook/useNavigate";
import { date } from "@/src/lib/dayjs/date";
import { useAppSelector } from "@/src/lib/redux/store";
import { formatForecastData } from "@/src/utils/forecast";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import ForecastSider from "./ForecastSider";
import { ICurrentForecast } from "./type";
import Dimension from "@/src/hook/useDevice";
import WeeklyForecast from "./WeeklyForecast";
import { StyledWrapper } from "./styled";
export interface ICoordinate {
  name?: string;
  longitude: string;
  latitude: string;
}

export default function WeatherPage() {
  const { unit, device } = useAppSelector((state) => state.app);
  const { query, onQueryChange } = useNavigate();
  const [coordinate, setCoordinate] = useState({ latitude: "", longitude: "" });
  const [weeklyData, setWeeklyData] = useState<ICurrentForecast[]>([]);
  const [city, setCity] = useState("");
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
    }
  };

  const getCurrentForecast = async (
    userCoordinate: ICoordinate,
    currentUnit: string
  ) => {
    const { latitude, longitude } = userCoordinate;

    const currentForecast = await callApi(WEATHER_API, {
      units: currentUnit,
      lat: latitude,
      lon: longitude,
      appid: WEATHER_TOKEN,
    });

    const uvIndex = await callApi(UVI_API, {
      lat: latitude,
      lon: longitude,
      appid: WEATHER_TOKEN,
    });

    const airQuality = await callApi(AIR_POLLUTION_API, {
      lat: latitude,
      lon: longitude,
      appid: WEATHER_TOKEN,
    });
    if (currentForecast && uvIndex && airQuality) {
      const formatCurrent = formatForecastData({
        ...currentForecast,
        airQuality: airQuality.list[0].main.aqi,
        uvIndex: uvIndex.value,
      });

      return formatCurrent;
    }
  };

  const getWeeklyForecast = async (
    userCoordinate: ICoordinate,
    currentUnit: string
  ) => {
    const weeklyForecast = await callApi(FORECAST_API, {
      units: currentUnit,
      lat: userCoordinate?.latitude,
      lon: userCoordinate?.longitude,
      appid: WEATHER_TOKEN,
    });

    if (weeklyForecast) {
      const sortedWeekly: ICurrentForecast[] = weeklyForecast.list
        .map((el: any) => formatForecastData(el))
        .filter((el: any) =>
          date.unix(el.dt).isSameOrAfter(date().startOf("day"), "day")
        );
      setCity(weeklyForecast.city.name);

      return sortedWeekly;
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (location) => {
        const latitude = location.coords.latitude.toString();
        const longitude = location.coords.longitude.toString();
        if (latitude && longitude)
          onQueryChange({ ...query, latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (query?.latitude && query?.longitude) init(query, unit);
  }, [query?.latitude, query?.longitude, unit]);

  const currentData = useMemo(() => {
    return weeklyData.find((el) => el.dt === Number(query?.dt));
  }, [query?.dt, weeklyData]);

  return (
    <StyledWrapper
      isMobile={device.isMobile}
      loading={!coordinate}
      className="main"
    >
      <ForecastSider
        setCoordinate={setCoordinate}
        data={currentData}
        city={city}
      />
      <WeeklyForecast weeklyData={weeklyData} />
    </StyledWrapper>
  );
}
