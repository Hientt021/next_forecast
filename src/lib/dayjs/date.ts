import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import { ICurrentForecast } from "@/app/weather/type";

dayjs.extend(utc);
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

export const date = dayjs;

export const getDayName = (dateStr: string, locale: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
};

export const addCurrentTime = (
  list: ICurrentForecast[],
  cur: ICurrentForecast
) => {
  const current = date.unix(cur?.dt).utc(true).unix();
  const arr = [...list];
  const addIndex = list.findIndex((el, i) => {
    return i < list.length - 1
      ? current >= el.dt && current <= list[i + 1].dt
      : current >= el.dt;
  });
  if (addIndex >= 0)
    arr.splice(addIndex + 1, 0, {
      ...cur,
      dt: current,
    });
  return arr;
};
