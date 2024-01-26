"use server";

import { ICoordinate } from "@/app/weather/page";
import api from "../api/api";
import { formatForecastData } from "../utils/forecast";
import { ICurrentForecast } from "@/app/weather/type";
import { date } from "../lib/dayjs/date";

export const getCurrentForecast = async (
  userCoordinate: ICoordinate,
  currentUnit: string
) => {
  const currentForecast = await getForecast(userCoordinate, currentUnit);
  const uvIndex = await getUvIndex(userCoordinate);

  const airQuality = await getAirPollution(userCoordinate);

  return Promise.all([currentForecast, uvIndex, airQuality])
    .then((data) => {
      const [forecastRes, uviRes, aqiRes] = data;
      const formatCurrent = formatForecastData({
        ...forecastRes,
        airQuality: aqiRes.list[0].main.aqi,
        uvIndex: uviRes.value,
      });
      return Promise.resolve(formatCurrent);
    })
    .catch((error: any) => Promise.reject(error.message));
};

export const getWeeklyForecast = async (
  userCoordinate: ICoordinate,
  currentUnit: string
) => {
  const weeklyForecast = await api.getWeeklyForecast(
    {
      units: currentUnit,
      lat: userCoordinate?.latitude,
      lon: userCoordinate?.longitude,
    },
    { next: { revalidate: 60 } }
  );

  if (weeklyForecast.success) {
    const sortedWeekly: ICurrentForecast[] = weeklyForecast.data.list
      .map((el: any) => formatForecastData(el))
      .filter((el: any) =>
        date.unix(el.dt).isSameOrAfter(date().startOf("day"), "day")
      );

    return Promise.resolve(sortedWeekly);
  } else return Promise.reject(weeklyForecast.message);
};

export const getCities = async (cityName: string) => {
  const citiesRes = await api.getCities({ q: cityName });
  if (citiesRes.success) return Promise.resolve(citiesRes.data);
  else return Promise.reject(citiesRes.message);
};

export const getForecast = async (
  userCoordinate: ICoordinate,
  currentUnit: string
) => {
  const forecastRes = await api.getTodayForecast(
    {
      units: currentUnit,
      lat: userCoordinate.latitude,
      lon: userCoordinate.longitude,
    },
    { next: { revalidate: 60 } }
  );
  if (forecastRes.success) return Promise.resolve(forecastRes.data);
  else return Promise.reject(forecastRes.message);
};

export const getUvIndex = async (userCoordinate: ICoordinate) => {
  const uviRes = await api.getUvIndex(
    {
      lat: userCoordinate.latitude,
      lon: userCoordinate.longitude,
    },
    { next: { revalidate: 60 } }
  );
  if (uviRes.success) return Promise.resolve(uviRes.data);
  else return Promise.reject(uviRes.message);
};

export const getAirPollution = async (userCoordinate: ICoordinate) => {
  const aqiRes = await api.getAirQuality(
    {
      lat: userCoordinate.latitude,
      lon: userCoordinate.longitude,
    },
    { next: { revalidate: 60 } }
  );
  if (aqiRes.success) return Promise.resolve(aqiRes.data);
  else return Promise.reject(aqiRes.message);
};
