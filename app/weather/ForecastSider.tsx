"use client";
import DegreeSwitch from "@/src/components/DegreeSwitch";
import ForecastIcon from "@/src/components/ForecastIcon";
import useUnit from "@/src/hook/useUnit";
import { date } from "@/src/lib/dayjs/date";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CitiesSearch from "./CitiesSearch";
import Loader from "@/src/components/Loader";
import { ICurrentForecast } from "./type";
import { ICoordinate } from "./page";
import { StyledWrapper } from "./styled";
import { useMemo } from "react";
import useNavigate from "@/src/hook/useNavigate";

interface IForecastSider {
  data?: ICurrentForecast;
}

export default function ForecastSider(props: IForecastSider) {
  const { data } = props;
  const { isMobile, isIpad, isDesktop } = useAppSelector(
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
    <StyledWrapper
      isMobile={isMobile}
      loading={!data && isAllowAccessLocation}
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: !isDesktop ? "100%" : "25%",
        p: !isDesktop ? 2 : 5,
        position: "relative",
      }}
    >
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <CitiesSearch />
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

      <Box
        display="flex"
        flexDirection={isIpad ? "row" : "column"}
        gap={isDesktop ? 5 : 2}
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

        <ForecastIcon size={100} data={data!!} />
      </Box>
      {isDesktop && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            fontSize: "1.25rem",
            width: "100%",
            height: 400,
          }}
        >
          <Image
            alt=""
            src={require("@/public/images/backgrounds/city.svg")}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      )}
    </StyledWrapper>
  );
}
