"use client";
import { Box, LinearProgress, Slider, Stack, Typography } from "@mui/material";
import useUnit from "../../hook/useUnit";
import { getDescription } from "@/app/(dashboard)/weather/components/AirConditions";
import { useMemo } from "react";
import { UNIT } from "@/app/(dashboard)/weather/type";
import { OUTDOOR_TEMPERATURE } from "@/app/(dashboard)/weather/const";
import ProgressBar from "./ProgressBar";
import ChartWrapper from "@/app/(dashboard)/weather/components/ChartWrapper";

interface ITemperatureBar {
  value: number;
}

export default function TemperatureBar(props: ITemperatureBar) {
  const { value } = props;
  const { unit, tempUnit, convertTemper } = useUnit();

  const selected = useMemo(() => {
    return getDescription(
      unit === UNIT.METRIC ? value : convertTemper(value, UNIT.METRIC),
      OUTDOOR_TEMPERATURE
    );
  }, [value]);

  const max = useMemo(
    () =>
      unit === UNIT.METRIC
        ? OUTDOOR_TEMPERATURE[0].max
        : convertTemper(OUTDOOR_TEMPERATURE[0].max),
    [unit]
  );
  const min = useMemo(
    () =>
      unit === UNIT.METRIC
        ? OUTDOOR_TEMPERATURE[OUTDOOR_TEMPERATURE.length - 1].max
        : convertTemper(
            OUTDOOR_TEMPERATURE[OUTDOOR_TEMPERATURE.length - 1].min
          ),
    [unit]
  );

  return (
    <ChartWrapper
      value={value}
      unitSymbol={tempUnit}
      min={Math.round(min)}
      max={Math.round(max)}
      description={selected?.label}
      pb={1}
    >
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: selected?.color,
          position: "absolute",
          top: 5,
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      />
      <LinearProgress
        sx={{
          borderRadius: "1rem",
          height: "0.75rem",
          marginLeft: "4px",
          pb: 1,

          ".MuiLinearProgress-barColorPrimary": {
            background: selected?.color,
          },
        }}
        variant="determinate"
        value={((value - min) * 100) / (max - min)}
      />
    </ChartWrapper>
  );
}
