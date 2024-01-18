import { Box, Typography, styled } from "@mui/material";
import { useMemo } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import ReactApexChart from "react-apexcharts";
interface ISemiRadialChart {
  value: number;
  label?: string;
}

const SemiRadialChart = (props: ISemiRadialChart) => {
  const { value, label } = props;
  const options = {
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        offsetY: -20,
        hollow: {
          size: "50%",
        },
        track: {
          show: true,
          width: 10,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "20px",
            fontWeight: 600,
            show: true,
            formatter: () => label,
          },
        },
      },
    },
    legend: {
      show: false,
    },
  };

  const series = [value];
  return (
    <ReactApexChart
      options={options as any}
      series={series}
      type="radialBar"
      height={250}
    />
  );
};

export default SemiRadialChart;
