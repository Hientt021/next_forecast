"use client";
import { ICurrentForecast } from "@/app/weather/type";
import { date } from "@/src/lib/dayjs/date";
import { Box } from "@mui/material";
import React, { Component, useMemo } from "react";
import Chart from "react-apexcharts";

interface IDailyForecastChart {
  data: ICurrentForecast[];
  active: number;
  onMarkerClick: (index: number) => void;
}

export default function DailyForecastChart(props: IDailyForecastChart) {
  const { data, active = 0, onMarkerClick } = props;

  const options = {
    dataLabels: {
      enabled: true,
      offsetY: -10,
      style: {
        fontSize: 16,
      },
      background: {
        enabled: false,
      },
      formatter: (value: string) => value + "°",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
        type: "x",
      },
      events: {
        markerClick: (e: any, chartContext: any, config: any) => {
          onMarkerClick(config.dataPointIndex);
        },
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      categories: data.map((el) => el.dt),
      tickAmount: data.length,
      labels: {
        formatter: (value: number) => {
          return date.unix(value).utc(false).format("HH:mm");
        },
        style: {
          fontSize: 16,
          fontWeight: 600,
        },
      },

      axisTicks: {
        show: false,
      },

      tooltip: {
        enabled: false,
      },
    },

    yaxis: {
      show: false,
    },
    grid: {
      borderColor: "grey",
      position: "front",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        left: 70,
        right: 70,
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
    },

    markers: {
      size: 5,
      strokeWidth: 0,
      style: "hollow",
    },
    // annotations: {
    //   xaxis: [
    //     {
    //       x: 4,
    //       borderColor: "red",
    //       strokeDashArray: 0,
    //     },
    //   ],
    // },
  };
  const series = [
    {
      name: "",
      data: data.map((el) => el.temp),
    },
  ];
  return (
    <Box
      sx={{
        ".apexcharts-gridline": {
          display: "none",
        },
        [`.apexcharts-gridline:nth-child(${active + 1})`]: {
          display: "inline",
        },
      }}
    >
      <Chart
        options={options as any}
        series={series}
        type="area"
        height={250}
      />
    </Box>
  );
}