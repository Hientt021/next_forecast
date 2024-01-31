"use client";
import SemiDonutChart from "@/src/components/chart/SemiDonutChart";
import CardComponent from "@/src/components/common/CardComponent";
import ProgressBar from "@/src/components/common/ProgressBar";
import ProgressStep from "@/src/components/common/ProgressStep";
import TemperatureBar from "@/src/components/common/TemperatureBar";
import useUnit from "@/src/hook/useUnit";
import { useAppSelector } from "@/src/lib/redux/store";
import AirIcon from "@mui/icons-material/Air";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MasksIcon from "@mui/icons-material/Masks";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import {
  AIR_POLLUTION_LIST,
  HUMIDITY_LIST,
  OUTDOOR_TEMPERATURE,
  UV_LIST,
} from "../const";
import { IHourForecast, UNIT } from "../type";
import ChartWrapper from "./ChartWrapper";
interface IAirConditions {
  currentData: IHourForecast;
}

export interface IProgressList {
  label?: string;
  min: number;
  max: number;
  color?: string;
}

export const getDescription = (value: number, list: IProgressList[]) => {
  return list.find((el) => el.min <= value && el.max >= value);
};

export default function AirConditions(props: IAirConditions) {
  const { currentData } = props;
  const { isMobileDevice } = useAppSelector((state) => state.app.device);
  const { convertSpeed, speedUnit, formatTemp, formatSpeed, unit } = useUnit();
  const contents = [
    {
      label: "Humidity",
      key: "humidity",
      icon: <WaterDropIcon />,
      mobileRender: (value: IHourForecast) => value.humidity + "%",
      render: (value: IHourForecast) => (
        <ChartWrapper
          value={value.humidity}
          unitSymbol="%"
          description={getDescription(value.humidity, HUMIDITY_LIST)?.label}
        >
          <ProgressStep steps={HUMIDITY_LIST} value={value?.humidity} />
        </ChartWrapper>
      ),
    },
    {
      label: "Wind",
      key: "wind",
      mobileRender: (value: IHourForecast) =>
        formatSpeed(value, { unit: true }),
      icon: <AirIcon />,
      render: (value: IHourForecast) => {
        const speed = formatSpeed(value) as number;
        return (
          <ChartWrapper
            value={speed}
            unitSymbol={speedUnit}
            min={0}
            max={unit === UNIT.METRIC ? 40 : convertSpeed(40, UNIT.IMPERIAL)}
          >
            <ProgressBar value={speed} />
          </ChartWrapper>
        );
      },
    },
    {
      label: "Feels like",
      key: "feels_like",
      unit: "°C",
      icon: <ThermostatIcon />,
      mobileRender: (value: IHourForecast) =>
        formatTemp(value, "feelslike", { unit: true }),
      render: (value: IHourForecast) => {
        const temp = formatTemp(value, "feelslike") as number;
        return <TemperatureBar value={temp} />;
      },
    },
    {
      label: "UV Index",
      key: "uv",
      icon: <Brightness7Icon />,
      mobileRender: (value: IHourForecast) => value.uv,
      render: (value: IHourForecast) => (
        <SemiDonutChart
          list={UV_LIST.map((el) => ({ ...el, color: "" }))}
          value={value?.uv!!}
        />
      ),
    },
    {
      label: "Air Pollution",
      key: "air_quality",
      icon: <MasksIcon />,
      mobileRender: (value: IHourForecast) => value.air_quality["us-epa-index"],
      render: (value: IHourForecast) => (
        <SemiDonutChart
          list={AIR_POLLUTION_LIST}
          value={value.air_quality["us-epa-index"]!!}
        />
      ),
    },
  ];

  const renderIcon = (icon: React.ReactNode) => (
    <Box
      className="icon"
      p={"4px"}
      sx={{
        background: isMobileDevice ? "transparent" : "#5C9CE5",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        svg: {
          fontSize: isMobileDevice ? "2rem" : "1.25rem",
          path: { fill: isMobileDevice ? "#5C9CE5" : "white " },
        },
      }}
    >
      {icon}
    </Box>
  );

  return isMobileDevice ? (
    <CardComponent
      p={2}
      sx={{
        ".step-label": {
          color: "GrayText",
          fontSize: "0.75rem",
        },
        ".apexcharts-pie-label": {
          fontSize: "0.75rem",
          color: "GrayText",
        },
      }}
    >
      <Grid container spacing={2}>
        {contents.map((el) => (
          <Grid key={el.key} item mobile={6} display="flex">
            {renderIcon(el.icon)}
            <Stack>
              <Typography className="step-label">{el.label}</Typography>
              <Typography fontWeight={600} fontSize={"1.125rem"}>
                {el.render(currentData)}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </CardComponent>
  ) : (
    <Grid
      spacing={2}
      container
      mt={1}
      sx={{
        ".step-label": {
          color: "GrayText",
          fontSize: "0.75rem",
        },
        ".apexcharts-pie-label": {
          fontSize: "0.75rem",
          color: "GrayText",
        },
      }}
    >
      {contents.map((el) => (
        <Grid
          item
          minWidth={300}
          desktop={4}
          laptop={6}
          key={el.key}
          display="flex"
          gap={1}
        >
          <CardComponent loading={!currentData} p={2} width={"100%"}>
            <Box
              display="flex"
              justifyContent={"space-between"}
              alignItems={"center"}
              width={"100%"}
            >
              <Typography fontWeight={600}>{el.label}</Typography>
              {renderIcon(el.icon)}
            </Box>
            <Box height={120} overflow={"hidden"} position={"relative"}>
              {isMobileDevice
                ? el.mobileRender(currentData)
                : el.render(currentData)}
            </Box>
          </CardComponent>
        </Grid>
      ))}
    </Grid>
  );
}
