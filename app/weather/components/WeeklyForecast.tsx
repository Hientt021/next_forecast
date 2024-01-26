"use client";
import useNavigate from "@/src/hook/useNavigate";
import useUnit from "@/src/hook/useUnit";
import { date, getDayName, isSameUnixDate } from "@/src/lib/dayjs/date";
import { useAppSelector } from "@/src/lib/redux/store";
import { Box, Drawer, Grid, Stack, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import TodayForecast from "./TodayForecast";
import WeeklyItem from "./WeeklyItem";
import { Scrollable, StyledWrapper } from "../styled";
import { ICurrentForecast, IDailyForecast } from "../type";
import EmptyLocation from "./EmptyLocation";
import { GREETING } from "../const";

interface IWeeklyForecast {
  weeklyData?: ICurrentForecast[];
}

export enum VIEW_MODE {
  LIST = "list",
  CHART = "chart",
}
export default function WeeklyForecast(props: IWeeklyForecast) {
  const { weeklyData = [] } = props;
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { onQueryChange, query } = useNavigate();
  const { formatUnit } = useUnit();
  const { isMobileDevice } = useAppSelector((state) => state.app.device);
  const { isAllowAccessLocation } = useAppSelector((state) => state.app);

  const [active, setActive] = useState(0);
  const [weeklyList, setWeeklyList] = useState<IDailyForecast[]>([]);

  const getDayList = async (data: any) => {
    const dayArr: Dayjs[] = [];
    if (!data) return [];
    let i = 0;
    const lastDate = date.unix(data[data.length - 1]?.dt);
    const dayLength = date.duration(lastDate.diff(date())).asDays();
    if (dayLength > 0) {
      while (dayArr.length <= dayLength) {
        const day = date().add(i, "day").utc(true).startOf("day");
        dayArr.push(day);
        i++;
      }
    }

    return dayArr;
  };

  const formatDayList = async (dayArr: Dayjs[], data: ICurrentForecast[]) => {
    const formatArr = dayArr.map((el) => {
      const list = data.filter((item: any) => {
        return isSameUnixDate(item.dt, el.unix());
      });

      const tempSortedList = list.map((item) => item.temp).sort();
      const minTemp: number = tempSortedList[0];
      const maxTemp: number = tempSortedList[tempSortedList.length - 1];

      return {
        date: el.isToday() ? "Today" : getDayName(el.format(), "en-US"),
        min: formatUnit(minTemp),
        max: formatUnit(maxTemp),
        icon: list?.[0]?.icon,
        list: list,
      };
    });
    return formatArr;
  };

  const formatForecastList = async (data: any) => {
    try {
      setLoading(true);
      const dayList = await getDayList(data);
      const formattedList = await formatDayList(dayList, data);
      setWeeklyList(formattedList);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const renderWeekly = (
    <Grid container>
      {weeklyList.map((el: any, i: number) => {
        return (
          <Grid key={i} item mobile={12}>
            <WeeklyItem
              active={active === i}
              onClick={() => {
                isMobileDevice && setOpenDrawer(false);
                setActive(i);
                onQueryChange({
                  ...query,
                  dt: el.dt,
                });
              }}
              data={el}
            />
          </Grid>
        );
      })}
    </Grid>
  );

  const renderToday = (
    <TodayForecast
      onOpen={() => setOpenDrawer(true)}
      currentList={weeklyList[active]?.list}
    />
  );

  useEffect(() => {
    formatForecastList(weeklyData);
  }, [weeklyData]);

  if (!(query?.latitude && query?.longitude))
    return <EmptyLocation className={isMobileDevice ? "wrapper" : ""} />;

  return (
    <Grid container spacing={1}>
      {!isMobileDevice && (
        <Grid item desktop={12} mb={1}>
          <Typography variant="h5" fontWeight={600}>
            {
              GREETING.find((el) => Number(date().format("HH")) >= el.hour)
                ?.label
            }
          </Typography>
          <Typography variant="body1" fontWeight={400}>
            {"Check out today's weather information"}
          </Typography>
        </Grid>
      )}

      <Scrollable
        item
        tablet={12}
        laptop={9}
        desktop={10}
        pb={isMobileDevice ? 10 : 0}
      >
        {renderToday}
      </Scrollable>

      <Scrollable
        item
        tablet={12}
        laptop={3}
        desktop={2}
        pb={isMobileDevice ? 10 : 0}
        sx={{
          paddingRight: 1,
        }}
      >
        {!isMobileDevice && renderWeekly}
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          anchor="bottom"
        >
          {renderWeekly}
        </Drawer>
      </Scrollable>
    </Grid>
  );
}
