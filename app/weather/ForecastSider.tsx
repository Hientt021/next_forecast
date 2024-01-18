"use client";
import DegreeSwitch from "@/src/components/DegreeSwitch";
import ForecastIcon from "@/src/components/ForecastIcon";
import useUnit from "@/src/hook/useUnit";
import { date } from "@/src/lib/dayjs/date";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import CitiesSearch from "./CitiesSearch";
import Loader from "@/src/components/Loader";
export default function ForecastSider() {
  const { current } = useAppSelector((state) => state.app.forecast);
  const dispatch = useAppDispatch();
  const { formatUnit } = useUnit();

  return (
    <Loader
      loading={!current}
      sx={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "20%",
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
        <CitiesSearch /> <DegreeSwitch />
      </Box>

      <Box display="flex" justifyContent={"space-between"} width={"100%"}>
        <Typography fontWeight={600}>{current?.city}</Typography>
        <Typography fontWeight={600}>{date().format("hh:mm")}</Typography>
      </Box>
      <Box display="flex" justifyContent={"space-between"} width={"100%"}>
        <Typography fontWeight={600}>
          {date().format("MMM DD, YYYY")}
        </Typography>
      </Box>
      <Typography my={3} variant="h2" fontWeight={600}>
        {formatUnit(current?.temp)}
      </Typography>
      <Box display={"flex"} gap={2}>
        <ForecastIcon size={50} data={current!!} />
        <Typography
          mt={2}
          fontWeight={600}
          sx={{ textTransform: "capitalize" }}
        >
          {current?.description}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          fontSize: 20,
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
    </Loader>
  );
}
