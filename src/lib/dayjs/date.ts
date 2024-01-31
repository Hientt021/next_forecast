import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import isoWeek from "dayjs/plugin/isoWeek";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(isoWeek);
dayjs.extend(duration);
dayjs.extend(timezone);

export const date = dayjs;

export const getDayName = (dateStr: string, locale: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { weekday: "long" });
};

export const isSameUnixDate = (start: number, end: number) => {
  const startDate = date.unix(start).utc(true);
  const endDate = date.unix(end).utc(true);

  return startDate.isSame(endDate, "day");
};

export const isUnixToday = (start: number) => {
  const startDate = date.unix(start).utc(true);

  return startDate.isToday();
};
