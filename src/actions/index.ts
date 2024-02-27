"use server";

import { ICoordinate } from "@/app/(dashboard)/weather/WeatherPage";
import api from "../api/api";
import { IForecastData } from "@/app/(dashboard)/weather/type";
import { date } from "../lib/dayjs/date";

export const getCities = async (cityName: string) => {
  const citiesRes = await api.getCities({ q: cityName });
  if (citiesRes.success) return Promise.resolve(citiesRes.data);
  else throw new Error(citiesRes.message);
};

export const getForecast: (
  coordinate: ICoordinate
) => Promise<IForecastData> = async (userCoordinate) => {
  const forecastRes = await api.getForecast(
    {
      q: userCoordinate.latitude + "," + userCoordinate.longitude,
      days: 3,
      aqi: "yes",
    },
    { next: { revalidate: 60 } }
  );
  if (forecastRes.success) return Promise.resolve(forecastRes.data);
  else throw new Error(forecastRes.message);
};
