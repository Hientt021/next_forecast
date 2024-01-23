import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isToday from "dayjs/plugin/isToday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import IsoWeek from "dayjs/plugin/IsoWeek";
import Duration from "dayjs/plugin/Duration";

dayjs.extend(utc);
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);
dayjs.extend(IsoWeek);
dayjs.extend(Duration);

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
