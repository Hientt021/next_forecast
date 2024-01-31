import { useSelector } from "react-redux";
import { useAppSelector } from "../lib/redux/store";
import {
  IDayForecast,
  IHourForecast,
  UNIT,
} from "@/app/(dashboard)/weather/type";
import { useMemo } from "react";

export type IUnitKey = "avgtemp" | "temp" | "feelslike";
export type IUnitValue = Partial<IDayForecast & IHourForecast>;
export type IUnitOptions = { unit?: boolean };

const useUnit = () => {
  const { unit } = useAppSelector((state) => state.app);
  const tempUnit = useMemo(() => (unit === UNIT.METRIC ? "°C" : "°F"), [unit]);
  const speedUnit = useMemo(
    () => (unit === UNIT.METRIC ? "m/s" : "km/h"),
    [unit]
  );
  const formatTemp = (
    value: IUnitValue,
    key: IUnitKey,
    options?: IUnitOptions
  ) => {
    const isUnit = options?.unit;
    if (!value) return isUnit ? "" : 0;
    switch (unit) {
      case UNIT.METRIC: {
        return isUnit
          ? value[(key + "_c") as keyof IUnitValue] + "°C"
          : (value[(key + "_c") as keyof IUnitValue] as number);
      }
      case UNIT.IMPERIAL: {
        return isUnit
          ? value[(key + "_f") as keyof IUnitValue] + "°F"
          : (value[(key + "_f") as keyof IUnitValue] as number);
      }
      default:
        return isUnit ? "" : 0;
    }
  };

  const formatSpeed = (value: IUnitValue, options?: IUnitOptions) => {
    const isUnit = options?.unit;
    if (!value) return isUnit ? "" : 0;
    switch (unit) {
      case UNIT.METRIC: {
        return isUnit ? value.wind_mph + "m/s" : value.wind_mph;
      }
      case UNIT.IMPERIAL: {
        return isUnit ? value.wind_kph + "km/h" : value.wind_kph;
      }
      default:
        return isUnit ? "" : 0;
    }
  };

  const convertSpeed = (value: number, toUnit?: UNIT) => {
    if (!value) return 0;
    switch (toUnit || unit) {
      case UNIT.METRIC: {
        return value / 1.6;
      }
      case UNIT.IMPERIAL: {
        return value * 1.6;
      }
      default:
        return 0;
    }
  };

  const convertTemper = (value: number, toUnit?: UNIT) => {
    switch (toUnit || unit) {
      case UNIT.METRIC: {
        return (value - 32) * (5 / 9);
      }
      case UNIT.IMPERIAL: {
        return value * (9 / 5) + 32;
      }
      default:
        return 0;
    }
  };

  return {
    unit,
    formatTemp,
    formatSpeed,
    tempUnit,
    convertTemper,
    speedUnit,
    convertSpeed,
  };
};

export default useUnit;
