"use client";
import Loader from "@/src/components/Loader";
import useNavigate from "@/src/hook/useNavigate";
import { date, getDayName, isSameUnixDate } from "@/src/lib/dayjs/date";
import { Box, Grid, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import TodayForecast from "./TodayForecast";
import WeeklyItem from "./WeeklyItem";
import { ICurrentForecast, IDailyForecast } from "./type";

interface IWeeklyForecast {
  weeklyData?: ICurrentForecast[];
}

export enum VIEW_MODE {
  LIST = "list",
  CHART = "chart",
}
export default function WeeklyForecast(props: IWeeklyForecast) {
  const { weeklyData = [] } = props;
  const { onQueryChange, query } = useNavigate();
  const [active, setActive] = useState(0);
  const [weeklyList, setWeeklyList] = useState<IDailyForecast[]>([]);
  const [loading, setLoading] = useState(false);

  const formatForecastList = (data: any) => {
    setLoading(true);
    const dayArr: Dayjs[] = [];
    let i = 0;
    while (dayArr.length < 6) {
      dayArr.push(date().add(i, "day").utc(true).startOf("day"));
      i++;
    }

    const formatArr: IDailyForecast[] = dayArr.map((el) => {
      const list: ICurrentForecast[] = data.filter((item: any) => {
        return isSameUnixDate(item.dt, el.unix());
      });

      const tempSortedList = list.map((item) => item.temp).sort();
      const minTemp: number = tempSortedList[0];
      const maxTemp: number = tempSortedList[tempSortedList.length - 1];

      return {
        date: el.isToday() ? "Today" : getDayName(el.format(), "en-US"),
        min: minTemp,
        max: maxTemp,
        icon: list?.[0]?.icon,
        list: list,
      };
    });
    setLoading(false);
    setWeeklyList(formatArr);
  };

  useEffect(() => {
    formatForecastList(weeklyData);
  }, [weeklyData]);

  return (
    <Loader loading={loading} className="wrapper">
      <Grid container p={5} spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h5" fontWeight={600}>
            {"Welcome"}
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            {"Check out today's weather information"}
          </Typography>
          {weeklyList.length > 0 && (
            <TodayForecast currentList={weeklyList[active]?.list} />
          )}
        </Grid>
        <Grid
          item
          xs={2}
          className="scroll"
          sx={{
            overflow: "auto",
            height: "100vh",
            paddingBottom: 7,
            paddingRight: 1,
          }}
        >
          <Box display={"flex"} flexDirection={"column"}>
            {weeklyList.map((el: any, i: number) => {
              return (
                <WeeklyItem
                  key={i}
                  active={active === i}
                  onClick={() => {
                    setActive(i);
                    onQueryChange({
                      ...query,
                      dt: el.dt,
                    });
                  }}
                  data={el}
                />
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Loader>
  );
}
