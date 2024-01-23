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
import MessageContainer from "@/src/hook/useAlert";
import { useSnackbar } from "notistack";
import useAlert from "@/src/hook/useAlert";
export interface ICoordinate {
  name?: string;
  longitude: string;
  latitude: string;
}

export default function WeatherPage() {
  const { unit, device, isAllowAccessLocation } = useAppSelector(
    (state) => state.app
  );
  const { isMobile, isIpad, isDesktop } = device;
  const { query, onQueryChange } = useNavigate();
  const { showAlert } = useAlert();
  const dispatch = useAppDispatch();
  const [weeklyData, setWeeklyData] = useState<ICurrentForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(false);

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
      dispatch(setCity(currentForecast.name));
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

      return sortedWeekly;
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
