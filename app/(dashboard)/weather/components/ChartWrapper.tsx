"use client";
import { Box, BoxProps, Stack, Typography } from "@mui/material";
import React from "react";
interface IChartWrapper extends BoxProps {
  value: number;
  unitSymbol: string;
  description?: string;
  min?: number;
  max?: number;
  children: React.ReactNode;
}

export default function ChartWrapper(props: IChartWrapper) {
  const {
    value,
    unitSymbol,
    description,
    children,
    min = "",
    max = "",
    ...rest
  } = props;
  return (
    <Stack gap={1} height="100%">
      <Box
        display={"flex"}
        alignItems={"flex-end"}
        gap={1}
        justifyContent={"center"}
      >
        <Typography variant="h6" fontWeight={600}>
          {value + unitSymbol}
        </Typography>
        <Typography
          fontWeight={500}
          sx={{ color: "GrayText", fontSize: "0.875rem" }}
        >
          {description}
        </Typography>
      </Box>
      <Box position="relative" maxHeight={60} {...rest}>
        {children}
        <Typography
          position={"absolute"}
          bottom={0}
          left={0}
          className="step-label"
          sx={{ transform: "translateY(110%)" }}
        >
          {min && min + unitSymbol}
        </Typography>
        <Typography
          position={"absolute"}
          bottom={0}
          right={0}
          className="step-label"
          sx={{ transform: "translateY(110%)" }}
        >
          {max && max + unitSymbol}
        </Typography>
      </Box>
    </Stack>
  );
}
