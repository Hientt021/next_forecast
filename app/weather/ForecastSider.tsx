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

interface IForecastSider {
  data?: ICurrentForecast;
  city: string;
  setCoordinate: (value: ICoordinate) => void;
}

export default function ForecastSider(props: IForecastSider) {
  const { data, city } = props;
  const { isMobile } = useAppSelector((state) => state.app.device);
  const { formatUnit } = useUnit();
  return (
    <StyledWrapper
      isMobile={isMobile}
      loading={!data}
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: isMobile ? "100%" : "20%",
        p: 5,
        position: "relative",
      }}
    >
      <Box
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <CitiesSearch value={city} />
        <DegreeSwitch />
      </Box>

      <Box
        display="flex"
        justifyContent={"space-between"}
        width={"100%"}
        pr={1}
      >
        <Typography fontWeight={600}>
          {date().format("MMM DD, YYYY")}
        </Typography>
        <Typography fontWeight={600}>{date().format("HH:mm")}</Typography>
      </Box>

      <Stack spacing={5} justifyContent={"center"} alignItems={"center"} mt={3}>
        <Typography my={3} variant="h2" fontWeight={600}>
          {formatUnit(data?.temp)}
        </Typography>
        <Typography
          mt={2}
          fontWeight={600}
          sx={{ textTransform: "capitalize" }}
        >
          {data?.description}
        </Typography>
        <ForecastIcon size={100} data={data!!} />
      </Stack>
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
    </StyledWrapper>
  );
}
