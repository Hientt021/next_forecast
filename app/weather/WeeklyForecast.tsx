"use client";
import CardComponent from "@/src/components/CardComponent";
import ForecastIcon from "@/src/components/ForecastIcon";
import Loader from "@/src/components/Loader";
import useUnit from "@/src/hook/useUnit";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import TodayForecast from "./TodayForecast";

interface IWeeklyForecast {
  onChange: (value: any) => void;
  weeklyList: any;
}

export enum VIEW_MODE {
  LIST = "list",
  CHART = "chart",
}

export default function WeeklyForecast(props: IWeeklyForecast) {
  const { weeklyList = [], onChange } = props;
  const [active, setActive] = useState(0);
  const { formatUnit } = useUnit();

  const todayList = useMemo(
    () => weeklyList?.[active]?.list,
    [active, weeklyList]
  );

  return (
    <Loader loading={!weeklyList.length} className="wrapper">
      <Grid container p={5} spacing={2}>
        <Grid item xs={10}>
          <Typography variant="h5" fontWeight={600}>
            {"Welcome"}
          </Typography>
          <Typography variant="h6" fontWeight={500}>
            {"Check out today's weather information"}
          </Typography>
          <TodayForecast onChange={onChange} data={todayList} />
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
                <CardComponent
                  key={i}
                  p={2}
                  width={"100%"}
                  sx={{
                    background: active !== i ? "transparent" : "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setActive(i);
                  }}
                >
                  <Stack justifyContent={"center"} alignItems={"center"}>
                    <Typography fontWeight={600}>{el.date}</Typography>
                    <ForecastIcon size={80} data={el} />
                    <Typography fontWeight={600}>
                      {formatUnit(el.min) + " / " + formatUnit(el.max)}
                    </Typography>
                  </Stack>
                </CardComponent>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Loader>
  );
}
