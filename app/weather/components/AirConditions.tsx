"use client";
import CardComponent from "@/src/components/common/CardComponent";
import ProgressStep from "@/src/components/common/ProgressStep";
import SemiCircle from "@/src/components/common/SemiCircle";
import TemperatureBar from "@/src/components/common/TemperatureBar";
import SemiDonutChart from "@/src/components/chart/SemiDonutChart";
import AirIcon from "@mui/icons-material/Air";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MasksIcon from "@mui/icons-material/Masks";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { ICurrentForecast } from "../type";
import { useAppSelector } from "@/src/lib/redux/store";
import useUnit from "@/src/hook/useUnit";
import React from "react";
interface IAirConditions {
  currentData: ICurrentForecast;
}

export interface IProgressList {
  label: string;
  min: number;
  max: number;
}

const HUMIDITY_LIST = [
  {
    label: "Good",
    min: 0,
    max: 33,
  },
  {
    label: "Normal",
    min: 34,
    max: 66,
  },
  {
    label: "Bad",
    min: 67,
    max: 100,
  },
];

export const UV_LIST = [
  {
    label: "Low",
    min: 0,
    max: 3,
    color: "#3ADCC1",
  },
  {
    label: "Medium",
    min: 3,
    max: 6,
    color: "#2E95EB",
  },
  {
    label: "High",
    min: 6,
    max: 8,
    color: "#D8DF23",
  },
  {
    label: "Very High",
    min: 8,
    max: 11,
    color: "#F6BA2A",
  },
  {
    label: "Danger",
    min: 11,
    max: 13,
    color: "#F74D2A",
  },
];

const WIND_LIST = [
  {
    label: "0",
    min: 0,
    max: 4.9,
  },
  {
    label: "5",
    min: 5,
    max: 9.9,
  },
  {
    label: "10",
    min: 10,
    max: 19.9,
  },
  {
    label: "20",
    min: 20,
    max: 29.9,
  },
  {
    label: "30",
    min: 30,
    max: 40,
  },
];

const OUTDOOR_TEMPERATURE = [
  {
    value: 37,
    label: "Heat Wave",
    color: "#D10A04",
    show: true,
  },
  {
    value: 32,
    label: "Very Hot",
    color: "#C1240E",
  },
  {
    value: 26,
    label: "Hot",
    color: "#D93B27",
  },
  {
    value: 22,
    label: "Room Temperature",
    color: "#ED5F4D",
    show: true,
  },
  {
    value: 15,
    label: "Warm",
    color: "#0F0748",
  },
  {
    value: 10,
    label: "Mild",
    color: "#B3EEFF",
  },
  {
    value: 4,
    label: "Cool",
    color: "#6783EE",
  },
  {
    value: 0,
    label: "Water Freezes",
    color: "#3053DA",
    show: true,
  },
  {
    value: -6,
    label: "Cold",
    color: "#3426A5",
  },
  {
    value: -10,
    label: "Very Cold",
    color: "#1F1765",
  },
  {
    value: -17,
    label: "Life-threatening",
    color: "#0F0748",
    show: true,
  },
  {
    value: -30,
    label: "Life-threatening",
    color: "#0F0748",
    show: true,
  },
];

const AIR_POLLUTION_LIST = [
  {
    label: "Good",
    min: 0,
    max: 1,
  },
  {
    label: "Fair",
    min: 1,
    max: 2,
  },
  {
    label: "Moderate",
    min: 2,
    max: 3,
  },
  {
    label: "Poor",
    min: 3,
    max: 4,
  },
  {
    label: "Very Poor",
    min: 4,
    max: 5,
  },
];

export const getDescription = (value: number, list: IProgressList[]) => {
  return list.find((el) => el.min <= value && el.max >= value);
};

export default function AirConditions(props: IAirConditions) {
  const { currentData } = props;
  const { isMobileDevice } = useAppSelector((state) => state.app.device);
  const { formatUnit, formatSpeed } = useUnit();
  const contents = [
    {
      label: "Humidity",
      key: "humidity",
      icon: <WaterDropIcon />,
      render: (value: any) =>
        isMobileDevice ? (
          value.humidity + "%"
        ) : (
          <Stack gap={1}>
            <Box
              display={"flex"}
              alignItems={"flex-end"}
              gap={1}
              justifyContent={"center"}
            >
              <Typography variant="h6" fontWeight={600}>
                {value?.humidity + "%"}
              </Typography>
              <Typography
                fontWeight={500}
                sx={{ color: "GrayText", fontSize: "0.875rem" }}
              >
                {getDescription(value?.humidity, HUMIDITY_LIST)?.label}
              </Typography>
            </Box>

            <ProgressStep steps={HUMIDITY_LIST} value={value?.humidity} />
          </Stack>
        ),
    },
    {
      label: "Wind",
      key: "wind",

      icon: <AirIcon />,
      render: (value: any) =>
        isMobileDevice ? (
          formatSpeed(value.wind)
        ) : (
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <SemiCircle
              value={value?.wind}
              max={40}
              label={formatSpeed(value?.wind)}
            />
          </Box>
        ),
    },
    {
      label: "Feels like",
      key: "feels_like",
      unit: "°C",
      icon: <ThermostatIcon />,
      render: (value: any) =>
        isMobileDevice ? (
          formatUnit(value?.feels_like)
        ) : (
          <TemperatureBar
            list={OUTDOOR_TEMPERATURE}
            value={value?.feels_like}
          />
        ),
    },
    {
      label: "UV Index",
      key: "uvIndex",
      show: !!currentData?.uvIndex,
      icon: <Brightness7Icon />,
      render: (value: any) =>
        isMobileDevice ? (
          value.uvIndex
        ) : (
          <SemiDonutChart list={UV_LIST} max={13} value={value?.uvIndex!!} />
        ),
    },
    {
      label: "Air Pollution",
      key: "airQuality",
      show: !!currentData?.airQuality,
      icon: <MasksIcon />,
      render: (value: any) =>
        isMobileDevice ? (
          value.airQuality
        ) : (
          <SemiDonutChart
            list={AIR_POLLUTION_LIST}
            max={5}
            value={value?.airQuality!!}
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
        {contents.map(
          (el) =>
            (el.show || el.show === undefined) && (
              <Grid key={el.key} item mobile={6} display="flex">
                {renderIcon(el.icon)}
                <Stack>
                  <Typography className="step-label">{el.label}</Typography>
                  <Typography fontWeight={600} fontSize={"1.125rem"}>
                    {el.render(currentData)}
                  </Typography>
                </Stack>
              </Grid>
            )
        )}
      </Grid>
    </CardComponent>
  ) : (
    <Grid
      spacing={3}
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
      {contents.map(
        (el) =>
          (el.show || el.show === undefined) && (
            <Grid item width={300} key={el.key} display="flex" gap={2}>
              <CardComponent loading={!currentData} p={3} width={"100%"}>
                <Box
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Typography fontWeight={600}>{el.label}</Typography>
                  {renderIcon(el.icon)}
                </Box>

                {el.render(currentData)}
              </CardComponent>
            </Grid>
          )
      )}
    </Grid>
  );
}
