"use client";

import { IProgressList } from "@/app/(dashboard)/weather/components/AirConditions";
import {
  Box,
  Grid,
  LinearProgress,
  LinearProgressProps,
  Typography,
  styled,
} from "@mui/material";
import { useMemo } from "react";
import useUnit from "../../hook/useUnit";

interface IProgressStep extends LinearProgressProps {
  steps: IProgressList[];
  value: number;
  gap?: number;
}

export default function ProgressStep(props: IProgressStep) {
  const { steps, value, gap = 1 } = props;

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
  }, [value, steps]);

  return (
    <Grid container spacing={gap}>
      {stepArray.map((el, i) => (
        <Grid key={i} item mobile={12 / steps.length}>
          <Typography className="step-label">{steps[i].label}</Typography>
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
