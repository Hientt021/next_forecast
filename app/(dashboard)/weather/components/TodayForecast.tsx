"use client";
import DailyForecastChart from "@/src/components/chart/DailyForecastChart";
import CardComponent from "@/src/components/common/CardComponent";
import Loader from "@/src/components/common/Loader";
import useNavigate from "@/src/hook/useNavigate";
import { useAppSelector } from "@/src/lib/redux/store";
import { ArrowRightRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IHourForecast } from "../type";
import AirConditions from "./AirConditions";

interface ITodayForecast {
  currentList: IHourForecast[];
  onOpen?: () => void;
}

export default function TodayForecast(props: ITodayForecast) {
  const { currentList, onOpen } = props;
  const { query, onQueryChange } = useNavigate();
  const [active, setActive] = useState(0);
  const { isMobile, isMobileDevice } = useAppSelector(
    (state) => state.app.device
  );
  const { current } = useAppSelector((state) => state.app);

  const onChange = (i: number) => {
    if (query) {
      setActive(i);
      onQueryChange({ ...query, dt: currentList?.[i]?.time_epoch });
    }
  };

  useEffect(() => {
    if (currentList) {
      const currentIndex = currentList.findIndex(
        (el) => el.time_epoch === current?.last_updated_epoch
      );
      const result = currentIndex >= 0 ? currentIndex : 0;
      onChange(result);
    }
  }, [currentList]);

  const renderChart = !isMobile && (
    <CardComponent p={2} pb={0}>
      <Typography fontWeight={600}>{"Today's Forecast"}</Typography>
      <DailyForecastChart
        active={active}
        data={currentList}
        onMarkerClick={onChange}
      />
    </CardComponent>
  );

  const renderTodayList = !!isMobileDevice && (
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
            {/* <Typography fontWeight={600}>{formatTemp(el.temp)}</Typography>
            <IconComponent name={el.icon} size={24} />
            <Typography fontWeight={600}>
              {currentData?.dt === el.dt
                ? "Now"
                : date.unix(el.dt).format("HH:mm")}
            </Typography> */}
          </Stack>
        ))}
      </Box>
    </>
  );

  return (
    <Loader loading={!currentList}>
      <Stack mt={!isMobileDevice ? 0 : 2} gap={!isMobileDevice ? 0 : 2}>
        {renderChart}
        <AirConditions currentData={currentList?.[active]} />
        {renderTodayList}
      </Stack>
    </Loader>
  );
}
