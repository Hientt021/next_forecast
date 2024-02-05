"use client";
import useNavigate from "@/src/hook/useNavigate";
import useUnit from "@/src/hook/useUnit";
import { date } from "@/src/lib/dayjs/date";
import { useAppSelector } from "@/src/lib/redux/store";
import { Drawer, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GREETING } from "../const";
import { Scrollable } from "../styled";
import { IDayForecastList, IForecastData, IHourForecast } from "../type";
import EmptyLocation from "./EmptyLocation";
import TodayForecast from "./TodayForecast";
import WeeklyItem from "./WeeklyItem";

interface IWeeklyForecast {
  weeklyList: IDayForecastList[];
}

export enum VIEW_MODE {
  LIST = "list",
  CHART = "chart",
}
export default function WeeklyForecast(props: IWeeklyForecast) {
  const { weeklyList } = props;
  const [openDrawer, setOpenDrawer] = useState(false);
  const { onQueryChange, query } = useNavigate();
  const { isMobileDevice } = useAppSelector((state) => state.app.device);
  const [active, setActive] = useState(0);

  const renderWeekly = (
    <Grid container>
      {weeklyList.map((el: IDayForecastList, i: number) => {
        return (
          <Grid key={i} item mobile={12}>
            <WeeklyItem
              active={active === i}
              onClick={() => {
                isMobileDevice && setOpenDrawer(false);
                setActive(i);
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
      currentList={weeklyList[active]?.hour}
    />
  );

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
      <Grid
        item
        tablet={12}
        laptop={9}
        desktop={10}
        pb={isMobileDevice ? 10 : 0}
        sx={{ overflow: "hidden" }}
      >
        <Scrollable>{renderToday}</Scrollable>
      </Grid>

      <Grid
        item
        tablet={12}
        laptop={3}
        desktop={2}
        pb={isMobileDevice ? 10 : 0}
        sx={{
          paddingRight: 1,
          overflow: "hidden",
        }}
      >
        <Scrollable>
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
    </Grid>
  );
}
