"use client";
import DegreeSwitch from "@/src/components/common/DegreeSwitch";
import useUnit from "@/src/hook/useUnit";
import { date } from "@/src/lib/dayjs/date";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CitiesSearch from "./CitiesSearch";
import Loader from "@/src/components/common/Loader";
import { ICurrentForecast } from "../type";
import { ICoordinate } from "../page";
import { StyledWrapper } from "../styled";
import { useEffect, useMemo } from "react";
import useNavigate from "@/src/hook/useNavigate";
import CityBuilding from "@/src/components/icons/CityBuilding";
import IconComponent from "@/src/components/icons";

interface IForecastSider {
  data?: ICurrentForecast;
}

export default function ForecastSider(props: IForecastSider) {
  const { data } = props;
  const { isIpad, isMobileDevice } = useAppSelector(
    (state) => state.app.device
  );
  const { isAllowAccessLocation } = useAppSelector((state) => state.app);
  const { query } = useNavigate();
  const { formatUnit } = useUnit();

  const dayTime = useMemo(
    () => (query?.dt ? date.unix(query?.dt) : date()).format("MMM DD, YYYY"),
    [query?.dt]
  );
  const hourTime = useMemo(
    () => (query?.dt ? date.unix(query?.dt) : date()).format("HH:mm"),
    [query?.dt]
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
          <CitiesSearch defaultValue={data?.city} />
          {query?.latitude && query?.longitude && <DegreeSwitch />}
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
        flexDirection={isIpad ? "row" : "column"}
        gap={!isIpad ? 5 : 2}
        justifyContent={"center"}
        alignItems={"center"}
        mt={3}
      >
        <Stack gap={2} alignItems={"center"}>
          <Typography variant="h2" fontWeight={600}>
            {formatUnit(data?.temp)}
          </Typography>
          <Typography fontWeight={600} sx={{ textTransform: "capitalize" }}>
            {data?.description}
          </Typography>
        </Stack>

        {data?.icon && (
          <IconComponent name={data?.icon as any} size={100} color="white" />
        )}
      </Box>
      {!isMobileDevice && <IconComponent name="city" size={"20rem"} />}
    </>
  );
}
