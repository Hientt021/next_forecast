import { useSelector } from "react-redux";
import { useAppSelector } from "../lib/redux/store";
import { UNIT } from "@/app/weather/type";

const useUnit = () => {
  const { unit } = useAppSelector((state) => state.unit);
  const formatUnit = (value?: number | string) => {
    switch (unit) {
      case UNIT.C: {
        return Number(value) + "°C";
      }
      case UNIT.F: {
        return Number(value) + "°F";
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
  };
};

export default useUnit;
