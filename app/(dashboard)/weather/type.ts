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

export interface IForecastData {
  current: IHourForecast;
  forecast: {
    forecastday: IDayForecastList[];
  };
  location: ILocation;
}

export interface IDayForecastList {
  date: string;
  date_epoch: number;
  day: IDayForecast;
  hour: IHourForecast[];
}

export interface IHourForecast {
  last_updated_epoch?: number;
  air_quality: IAirQuality;
  chance_of_rain: number;
  chance_of_snow: number;
  cloud: number;
  condition: ICondition;
  dewpoint_c: number;
  dewpoint_f: number;
  diff_rad: number;
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  heatindex_c: number;
  heatindex_f: number;
  humidity: number;
  is_day: number;
  precip_in: number;
  precip_mm: number;
  pressure_in: number;
  pressure_mb: number;
  short_rad: number;
  snow_cm: number;
  temp_c: number;
  temp_f: number;
  time: string;
  time_epoch: number;
  uv: number;
  vis_km: number;
  vis_miles: number;
  will_it_rain: number;
  will_it_snow: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
  windchill_c: number;
  windchill_f: number;
}

export interface IDayForecast {
  air_quality: IAirQuality;
  avghumidity: number;
  avgtemp_c: number;
  avgtemp_f: number;
  avgvis_km: number;
  avgvis_miles: number;
  condition: ICondition;
  daily_chance_of_rain: number;
  daily_chance_of_snow: number;
  daily_will_it_rain: number;
  daily_will_it_snow: number;
  maxtemp_c: number;
  maxtemp_f: number;
  maxwind_kph: number;
  maxwind_mph: number;
  mintemp_c: number;
  mintemp_f: number;
  totalprecip_in: number;
  totalprecip_mm: number;
  totalsnow_cm: number;
  uv: number;
  time_epoch: number;
}

export interface ICondition {
  text: string;
  icon: string;
  code: number;
}

export interface ILocation {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
}

export interface IAirQuality {
  co: number;
  ["gb-defra-index"]: number;
  no2: number;
  o3: number;
  pm2_5: number;
  pm10: number;
  so2: number;
  ["us-epa-index"]: number;
}
