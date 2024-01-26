import { useSelector } from "react-redux";
import { useAppSelector } from "../lib/redux/store";
import { UNIT } from "@/app/weather/type";

const useUnit = () => {
  const { unit } = useAppSelector((state) => state.app);

  const formatUnit = (value?: number | string) => {
    if (!value) return "";
    switch (unit) {
      case UNIT.METRIC: {
        return Number(value) + "°C";
      }
      case UNIT.IMPERIAL: {
        return Number(value) + "°F";
      }
      default:
        return "";
    }
  };

  const formatSpeed = (value?: number | string) => {
    if (!value) return "";
    switch (unit) {
      case UNIT.METRIC: {
        return Number(value) + "m/s";
      }
      case UNIT.IMPERIAL: {
        return Number(value) + "km/h";
      }
      default:
        return "";
    }
  };

  const convertMetric = (value: number) => {
    const newValue = (9 / 5) * value + 32;
    return Math.floor(newValue);
  };

  const convertImperial = (value: number) => {
    const newValue = (5 / 9) * (value - 32);
    return Math.floor(newValue);
  };

  return {
    unit,
    formatUnit,
    convertMetric,
    convertImperial,
    formatSpeed,
  };
};

export default useUnit;
