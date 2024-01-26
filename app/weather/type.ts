export interface ICurrentForecast {
  city?: string;
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
  feels_like: number;
  dt: number;
  uvIndex?: number;
  airQuality?: number;
}
export enum UNIT {
  METRIC = "metric",
  IMPERIAL = "imperial",
}
export type IUnit = "metric" | "imperial";

export interface IDailyForecast {
  date: string;
  min: string;
  max: string;
  icon: any;
  list: ICurrentForecast[];
}
