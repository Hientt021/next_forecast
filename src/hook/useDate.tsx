"use client";
import { date } from "../lib/dayjs/date";
import { useAppSelector } from "../lib/redux/store";
import useNavigate from "./useNavigate";

export default function useDate() {
  const { query } = useNavigate();
  const { location } = useAppSelector((state) => state.app);
  const formatByTimezone = (unix: number, format: string) => {
    return date.unix(unix).tz(location?.tz_id).format(format);
  };

  return { formatByTimezone };
}
