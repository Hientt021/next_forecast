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
  C = "metric",
  F = "imperial",
}
export type IUnit = "metric" | "imperial";

export interface IDailyForecast {
  date: string;
  min: number;
  max: number;
  icon: any;
  list: ICurrentForecast[];
}
