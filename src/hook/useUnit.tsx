import { useSelector } from "react-redux";
import { useAppSelector } from "../lib/redux/store";
import { IDayForecast, IHourForecast } from "@/app/(dashboard)/weather/type";
import { useMemo } from "react";
import { TEMPERATURE_UNIT, WIND_UNIT } from "../const/unit";

export type IUnitKey = "avgtemp" | "temp" | "feelslike";
export type IUnitValue = Partial<IDayForecast & IHourForecast>;
export type IUnitOptions = { unit?: boolean };

const useUnit = () => {
  const unit = useAppSelector((state) => state.app.unit);
  const { temperature, wind } = unit;

  const formatTemp = (value: IUnitValue, key: IUnitKey) => {
    if (!value) return 0;
    switch (temperature) {
      case TEMPERATURE_UNIT.CELSIUS: {
        return value[(key + "_c") as keyof IUnitValue];
      }
      case TEMPERATURE_UNIT.FAHRENHEIT: {
        return value[(key + "_f") as keyof IUnitValue];
      }
      default:
        return 0;
    }
  };

  const formatSpeed = (value: IUnitValue) => {
    if (!value) return 0;
    switch (wind) {
      case WIND_UNIT.METER_PER_SECOND: {
        return value.wind_mph;
      }
      case WIND_UNIT.KILOMETER_PER_HOUR: {
        return value.wind_kph;
      }
      default:
        return 0;
    }
  };

  const convertSpeed = (value: number, toUnit: string) => {
    if (!value) return 0;
    switch (toUnit) {
      case WIND_UNIT.METER_PER_SECOND: {
        return Math.round(value / 1.6);
      }
      case WIND_UNIT.KILOMETER_PER_HOUR: {
        return Math.round(value * 1.6);
      }
      default:
        return 0;
    }
  };

  const convertTemper = (value: number, toUnit: string) => {
    switch (toUnit) {
      case TEMPERATURE_UNIT.CELSIUS: {
        return Math.round((value - 32) * (5 / 9));
      }
      case TEMPERATURE_UNIT.FAHRENHEIT: {
        return Math.round(value * (9 / 5) + 32);
      }
      default:
        return 0;
    }
  };

  const handleTemperatureUnitChange = (newUnit: string) => {};

  return {
    unit,
    formatTemp,
    formatSpeed,
    convertTemper,
    convertSpeed,
  };
};

export default useUnit;
