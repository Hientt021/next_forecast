"use client";
import {
  ICurrentForecast,
  IHourForecast,
  UNIT,
} from "@/app/(dashboard)/weather/type";
import { date } from "@/src/lib/dayjs/date";
import { Box } from "@mui/material";
import React, { Component, useEffect, useMemo, useRef } from "react";
import ApexChart from "./ApexChart";
import useUnit from "@/src/hook/useUnit";
import useNavigate from "@/src/hook/useNavigate";
import { useAppSelector } from "@/src/lib/redux/store";
import useDate from "@/src/hook/useDate";

interface IDailyForecastChart {
  data: IHourForecast[];
  onMarkerClick: (index: number) => void;
  active: number;
}

export default function DailyForecastChart(props: IDailyForecastChart) {
  const { data, onMarkerClick, active } = props;
  const { unit, formatTemp } = useUnit();
  const { query } = useNavigate();
  const { location } = useAppSelector((state) => state.app);
  const { formatByTimezone } = useDate();

  const options = {
    dataLabels: {
      offsetY: -10,
      style: {
        fontSize: "1rem",
      },
      background: {
        enabled: false,
      },
      formatter: (val: number, opts: any) => {
        return opts.dataPointIndex === active ? val + "°" : "";
      },
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
      offsetY: 10,
      axisBorder: {
        show: false,
      },
      categories: data.map((el, i) => el.time_epoch),
      tickAmount: 7,
      labels: {
        formatter: (value: number) => {
          return formatByTimezone(value, "HH:mm");
        },
        style: {
          fontSize: "1rem",
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
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
      padding: {
        left: 50,
        right: 50,
      },
    },
    markers: {
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: active,
          fillColor: "#008ffb",
          strokeWidth: 0,
          strokeColor: "transparent",
          size: 7,
          shape: "circle",
        },
      ],
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
        const current = data[dataPointIndex];
        const hour = formatByTimezone(current.time_epoch, "HH:mm");
        const temp = formatTemp(current, "temp", { unit: true });

        return (
          '<div class="custom-tooltip">' +
          "<p>" +
          hour +
          "</p>" +
          "<p>" +
          temp +
          "</p>" +
          "</div>"
        );
      },
    },
  };
  const series = [
    {
      name: location?.name + " Temperature",
      data: data.map((el, i) => (unit === UNIT.METRIC ? el.temp_c : el.temp_f)),
    },
  ];
  return (
    <Box
      sx={{
        ".apexcharts-xaxis-label": {
          transform: "none",
        },
        "line.apexcharts-gridline": {
          display: "none",
        },
        [`line.apexcharts-gridline::nth-of-type(${active + 1})`]: {
          display: "inline-block",
        },

        ".custom-tooltip": {
          padding: 1,
          fontWeight: 600,
        },
        "g.apexcharts-data-labels::before": {
          content: `"hi"`,
          display: "block",
          width: 30,
          height: 30,
          background: "red",
        },
      }}
    >
      <ApexChart
        options={options as any}
        series={series}
        type="area"
        height={200}
      />
    </Box>
  );
}
