import { Box, Typography, styled } from "@mui/material";
import { useMemo } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import ReactApexChart from "react-apexcharts";
import { UV_LIST, getDescription } from "@/app/weather/AirConditions";
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
    console.log(index);
    return index;
  }, [value, max, list]);
  const options = {
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 0,
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
          transform: "translate(-50%, -50%)",
          rotate: `${-90 + (activeIndex / list.length) * 240}deg`,
        },
      }}
    >
      <Box
        sx={{
          height: 130,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <ReactApexChart options={options as any} series={series} type="donut" />
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
        <Typography variant="h6" fontWeight={600} children={value} />
        <Typography
          fontWeight={500}
          sx={{ color: "GrayText", fontSize: "0.875rem" }}
          children={getDescription(value, list)?.label}
        />
      </Box>
      <NavigationIcon className="arrow" />
    </Box>
  );
};

export default SemiDonutChart;
