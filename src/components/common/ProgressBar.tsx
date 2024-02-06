"use client";
import { Box, Typography, styled } from "@mui/material";
import { useMemo } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import ApexChart from "../chart/ApexChart";
import useUnit from "@/src/hook/useUnit";
import { UNIT } from "@/app/(dashboard)/weather/type";
import { WIND_UNIT } from "@/src/const/unit";

interface IProgressBar {
  value: number;
}

const speedBar = [5, 10, 20, 30, 40];

const ProgressBar = (props: IProgressBar) => {
  const { value } = props;
  const { convertSpeed, formatTemp, formatSpeed, unit } = useUnit();
  const { wind } = unit;
  const values = useMemo(
    () =>
      speedBar.map((el) =>
        wind === WIND_UNIT.KILOMETER_PER_HOUR
          ? el
          : convertSpeed(el, WIND_UNIT.METER_PER_SECOND)
      ),
    [wind]
  );
  const options = {
    chart: {
      stacked: true,
      offsetY: -65,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
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
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        dataLabels: {
          total: {
            enabled: false,
          },
          hideOverflowingLabels: true,
        },
      },
    },
    legend: {
      show: false,
    },
    fill: {
      opacity: 1,
    },

    colors: ["#1976d2", "grey"],
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const activeIndex = values.findIndex((el) => el > value);
  const list = [
    {
      name: "first",
      data: values.map((el, i) => {
        if (i < activeIndex) return el;
        if (i > activeIndex) return 0;
        if (i === activeIndex) return value;
      }),
    },
    {
      name: "second",
      data: values.map((el, i) => {
        if (i > activeIndex) return el;
        if (i < activeIndex) return 0;
        if (i === activeIndex) return el - value;
      }),
    },
  ];
  const series = list;
  return (
    <ApexChart
      height={140}
      options={options as any}
      series={series}
      type="bar"
    />
  );
};

export default ProgressBar;
