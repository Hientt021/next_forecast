"use client";
import useUnit from "@/src/hook/useUnit";
import { date } from "@/src/lib/dayjs/date";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CitiesSearch from "./CitiesSearch";
import Loader from "@/src/components/common/Loader";
import { ICurrentForecast, IForecastData, IHourForecast } from "../type";
import { ICoordinate } from "../page";
import { StyledWrapper } from "../styled";
import { useEffect, useMemo } from "react";
import useNavigate from "@/src/hook/useNavigate";
import CityBuilding from "@/src/components/icons/CityBuilding";
import IconComponent from "@/src/components/icons";
import WeatherIcon from "@/src/components/icons/WeatherIcon";
import useDate from "@/src/hook/useDate";

interface IHourForecastSider {
  data: IHourForecast;
  city?: string;
  onCoordinateChange: (value: ICoordinate) => void;
}

export default function ForecastSider(props: IHourForecastSider) {
  const { data, city = "", onCoordinateChange } = props;
  const { isIpad, isMobileDevice } = useAppSelector(
    (state) => state.app.device
  );
  const { query } = useNavigate();
  const { formatTemp, unit } = useUnit();
  const { formatByTimezone } = useDate();

  const dayTime = useMemo(
    () => formatByTimezone(data.time_epoch, "MMM DD, YYYY"),
    [data]
  );
  const hourTime = useMemo(
    () => formatByTimezone(data.time_epoch, "HH:mm"),
    [data]
  );

  return (
    <>
      <Stack width={"100%"}>
        <Box
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <CitiesSearch onChange={onCoordinateChange} defaultValue={city} />
        </Box>

        <Box
          display="flex"
          justifyContent={"space-between"}
          width={"100%"}
          pr={1}
        >
          <Typography fontWeight={600}>{dayTime}</Typography>
          <Typography fontWeight={600}>{hourTime}</Typography>
        </Box>
      </Stack>

      <Box
        display="flex"
        flexDirection={isMobileDevice ? "row" : "column"}
        gap={!isMobileDevice ? 5 : 2}
        justifyContent={"center"}
        alignItems={"center"}
        mt={3}
      >
        <Stack gap={2} alignItems={"center"}>
          <Typography variant="h2" fontWeight={600}>
            {formatTemp(data, "temp") + unit.temperature}
          </Typography>
          <Typography fontWeight={600} sx={{ textTransform: "capitalize" }}>
            {data.condition.text}
          </Typography>
        </Stack>
        <WeatherIcon code={data.condition?.code} size={100} />
      </Box>
      {!isMobileDevice && <IconComponent name="city" size={"20rem"} />}
    </>
  );
}
