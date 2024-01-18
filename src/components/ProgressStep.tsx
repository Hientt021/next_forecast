"use client";

import { IProgressList } from "@/app/weather/AirConditions";
import {
  Box,
  Grid,
  LinearProgress,
  LinearProgressProps,
  Typography,
  styled,
} from "@mui/material";
import { useMemo } from "react";
import useUnit from "../hook/useUnit";

interface IProgressStep extends LinearProgressProps {
  steps: IProgressList[];
  value: number;
  gap?: number;
  isImperial?: boolean;
}

const EllipseStep = styled(Box)(({ index }: { index: number }) => ({
  width: "100%",
  height: 10,
  // borderRadius: "25px",
  background: "red",
  // transform: `rotate(${(index + 1) * (-180 / 5)}deg)`,
}));

export default function ProgressStep(props: IProgressStep) {
  const { steps, value, gap = 1, isImperial = false } = props;
  //   const stepArray = useMemo(() => {
  //     console.log(value);
  //     const stepValue = 100 / steps.length;
  //     let i = 0;
  //     const arr: number[] = [];
  //     while (i < steps.length) {
  //       const currentIndex = Math.floor(value / stepValue);
  //       const currentValue = value - i * stepValue;
  //       const progressValue =
  //         i === currentIndex
  //           ? (currentValue * 100) / stepValue
  //           : i < currentIndex
  //           ? 100
  //           : 0;

  //       arr.push(progressValue);
  //       i++;
  //     }
  //     return arr;
  //   }, [value, steps]);

  const stepArray = useMemo(() => {
    const currentIndex = steps.findIndex(
      (el) => el.min <= value && el.max >= value
    );
    return steps.map((el, i) => {
      return i < currentIndex
        ? 100
        : i > currentIndex
        ? 0
        : ((value - el.min) * 100) / (el.max - el.min);
    });
  }, [value, steps, isImperial]);
  return (
    <Grid container spacing={gap}>
      {stepArray.map((el, i) => (
        <Grid key={i} item xs={12 / steps.length}>
          <Typography className="step-label" children={steps[i].label} />
          <LinearProgress
            sx={{ borderRadius: "1rem", height: "0.5rem" }}
            key={i}
            variant="determinate"
            value={el}
          />
        </Grid>
      ))}
    </Grid>
  );
}
