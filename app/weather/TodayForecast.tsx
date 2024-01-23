"use client";
import CardComponent from "@/src/components/CardComponent";
import DailyForecastChart from "@/src/components/chart/DailyForecastChart";
import useNavigate from "@/src/hook/useNavigate";
import { date } from "@/src/lib/dayjs/date";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AirConditions from "./AirConditions";
import { ICurrentForecast } from "./type";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import ForecastIcon from "@/src/components/ForecastIcon";
import useUnit from "@/src/hook/useUnit";
import {
  ArrowRight,
  ArrowRightAltOutlined,
  ArrowRightRounded,
} from "@mui/icons-material";

interface ITodayForecast {
  currentList: ICurrentForecast[];
  onOpen?: () => void;
}

export default function TodayForecast(props: ITodayForecast) {
  const { currentList, onOpen } = props;
  const { query, onQueryChange } = useNavigate();
  const [active, setActive] = useState(0);
  const { isMobile, isIpad, isDesktop } = useAppSelector(
    (state) => state.app.device
  );
  const { formatUnit } = useUnit();
  const currentData = currentList?.find((el) => el.airQuality && el.uvIndex);

  const onChange = (i: number) => {
    setActive(i);
    onQueryChange({ ...query, dt: currentList[i]?.dt });
  };

  useEffect(() => {
    if (currentList) {
      const currentIndex = currentList.findIndex(
        (el) => el.airQuality && el.uvIndex
      );
      const result = currentIndex >= 0 ? currentIndex : 0;
      setActive(result);
      onQueryChange({ ...query, dt: currentList[result]?.dt });
    }
  }, [currentList]);

  const renderChart = !isMobile && (
    <CardComponent p={2} pb={0}>
      <Typography fontWeight={600}>{"Today's Forecast"}</Typography>
      <DailyForecastChart
        data={currentList}
        active={active}
        onMarkerClick={onChange}
      />
    </CardComponent>
  );

  const renderTodayList = !isDesktop && (
    <>
      <Box display="flex" justifyContent={"flex-end"}>
        <Typography
          fontWeight={600}
          fontSize={"0.75rem"}
          sx={{ color: "white" }}
          onClick={onOpen}
        >
          View weekly forecast
          <ArrowRightRounded />
        </Typography>
      </Box>
      <Box display="flex" overflow={"auto"} gap={3}>
        {currentList?.map((el, i) => (
          <Stack
            key={i}
            onClick={() => onChange(i)}
            minWidth={"70px"}
            minHeight={"130px"}
            sx={{ background: active === i ? "white" : "transparent" }}
            borderRadius={8}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={1}
          >
            <Typography fontWeight={600}>{formatUnit(el.temp)}</Typography>
            <ForecastIcon data={el} size={24} />
            <Typography fontWeight={600}>
              {currentData?.dt === el.dt
                ? "Now"
                : date.unix(el.dt).format("HH:mm")}
            </Typography>
          </Stack>
        ))}
      </Box>
    </>
  );
  return (
    currentList && (
      <Stack mt={isDesktop ? 0 : 2} gap={isDesktop ? 0 : 2}>
        {renderChart}
        <AirConditions currentData={currentList?.[active]} />
        {renderTodayList}
      </Stack>
    )
  );
}
