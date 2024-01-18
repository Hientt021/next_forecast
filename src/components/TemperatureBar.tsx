import { Box, Slider, Stack, Typography } from "@mui/material";
import useUnit from "../hook/useUnit";
import { getDescription } from "@/app/weather/AirConditions";
import { useMemo } from "react";
import { UNIT } from "@/app/weather/type";

interface ITemperatureBar {
  value: number;
  list: {
    value: number;
    label: string;
    color?: string;
    show?: boolean;
  }[];
}

export default function TemperatureBar(props: ITemperatureBar) {
  const { value, list } = props;
  const { formatUnit, convertMetric, unit } = useUnit();

  const tempList = useMemo(
    () =>
      unit === UNIT.C
        ? list
        : list.map((el) => ({ ...el, value: convertMetric(el.value) })),
    [unit]
  );

  const currentTemp = useMemo(
    () => tempList.find((el) => el.value < value),
    [value, list]
  );

  return (
    <Stack gap={1}>
      <Box
        display={"flex"}
        alignItems={"flex-end"}
        gap={1}
        justifyContent={"center"}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          children={formatUnit(value)}
        />
        <Typography
          fontWeight={500}
          sx={{ color: "GrayText", fontSize: "0.875rem" }}
          children={currentTemp?.label}
        />
      </Box>
      <Slider
        getAriaValueText={(value) => formatUnit(value)}
        step={tempList.length}
        marks={tempList
          .filter((el) => el.show)
          .map((el) => ({ ...el, label: formatUnit(el.value) }))}
        valueLabelDisplay="auto"
        size="medium"
        value={value}
        min={tempList[tempList.length - 1].value}
        max={tempList[0].value}
        sx={{
          ".MuiSlider-track": {
            color: currentTemp?.color,
          },
          "& .MuiSlider-thumb": {
            background: currentTemp?.color,
          },
        }}
      />
    </Stack>
  );
}
