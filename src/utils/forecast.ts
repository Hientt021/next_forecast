import { ICurrentForecast } from "@/app/weather/type";
import { date } from "../lib/dayjs/date";

export function formatForecastData(data: any) {
  return {
    temp: data.main.temp,
    city: data.name,
    description: data.weather?.[0]?.description,
    icon: data.weather?.[0]?.icon,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    feels_like: data.main.feels_like,
    dt: date.unix(data.dt).utc(false).unix(),
    uvIndex: data?.uvIndex,
    airQuality: data?.airQuality,
  } as ICurrentForecast;
}
