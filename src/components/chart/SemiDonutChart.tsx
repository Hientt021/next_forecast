"use client";
import { Box, Typography, styled } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import { UV_LIST, getDescription } from "@/app/weather/AirConditions";
import ApexChart from "./ApexChart";
interface ISemiDonutChart {
  value: number;
  max: number;
  label?: string;
  list: IChartList[];
}

interface IChartList {
  label: string;
  min: number;
  max: number;
}

const SemiDonutChart = (props: ISemiDonutChart) => {
  const { value, max, label, list } = props;
  const activeIndex = useMemo(() => {
    const index = list.findIndex((el) => el.min < value && el.max >= value);
    return index;
  }, [value, max, list]);
  const ref = useRef();
  const options = {
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: -5,
        dataLabels: {
          offset: 0,
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      formatter: (value: number, otp: any) => {
        return list[otp.seriesIndex].max;
      },
      style: {
        colors: ["white"],
      },
    },
    colors: list.map((el, i) => {
      return i <= activeIndex ? "#1976d2" : "rgb(167, 202, 237)";
    }),
    tooltip: {
      enabled: false,
    },
  };

  const series = list.map((el) => el.max - el.min);
  const currentDeg = useMemo(() => {
    const selected = list[activeIndex];
    if (selected) {
      const { min, max: selectedMax } = selected;
      const pointDeg = 180 / max;
      const currentPoint = (selectedMax + min) / 2;
      return -90 + pointDeg * currentPoint;
    }
  }, [activeIndex, list, max]);

  return (
    <Box
      sx={{
        pointerEvents: "none",
        position: "relative",
        ".arrow": {
          path: {
            fill: "#1976d2",
          },
          position: "absolute",
          bottom: 0,
          left: "50%",
          rotate: `z ${currentDeg}deg`,
        },
        fontSize: "1rem",
      }}
    >
      <Box
        sx={{
          maxHeight: 120,
          overflow: "hidden",
          position: "relative",
        }}
        ref={ref}
      >
        <ApexChart
          height={250}
          options={options as any}
          series={series}
          type="donut"
        />
      </Box>

      <Box
        display={"flex"}
        alignItems={"center"}
        gap={1}
        justifyContent={"center"}
        sx={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%, -75%)",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {value}
        </Typography>
        <Typography
          fontWeight={500}
          sx={{ color: "GrayText", fontSize: "0.875rem" }}
        >
          {getDescription(value, list)?.label}
        </Typography>
      </Box>
      <NavigationIcon className="arrow" />
    </Box>
  );
};

export default SemiDonutChart;
