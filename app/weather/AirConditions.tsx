import CardComponent from "@/src/components/CardComponent";
import AirIcon from "@mui/icons-material/Air";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { Box, Grid, Rating, Stack, Stepper, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import ProgressStep from "@/src/components/ProgressStep";
import useUnit from "@/src/hook/useUnit";
import { ICurrentForecast, UNIT } from "./type";
import SemiCircle from "@/src/components/SemiCircle";
import SemiDonutChart from "@/src/components/chart/SemiDonutChart";
import MasksIcon from "@mui/icons-material/Masks";
import TemperatureBar from "@/src/components/TemperatureBar";
interface IAirConditions {
  data: ICurrentForecast;
}

export interface IProgressList {
  label: string;
  min: number;
  max: number;
}

const HUMIDITY_LIST = [
  {
    label: "Good",
    min: 0,
    max: 33,
  },
  {
    label: "Normal",
    min: 34,
    max: 66,
  },
  {
    label: "Bad",
    min: 67,
    max: 100,
  },
];

export const UV_LIST = [
  {
    label: "Low",
    min: 0,
    max: 3,
    color: "#3ADCC1",
  },
  {
    label: "Medium",
    min: 3,
    max: 6,
    color: "#2E95EB",
  },
  {
    label: "High",
    min: 6,
    max: 8,
    color: "#D8DF23",
  },
  {
    label: "Very High",
    min: 8,
    max: 11,
    color: "#F6BA2A",
  },
  {
    label: "Danger",
    min: 11,
    max: 13,
    color: "#F74D2A",
  },
];

const WIND_LIST = [
  {
    label: "0",
    min: 0,
    max: 4.9,
  },
  {
    label: "5",
    min: 5,
    max: 9.9,
  },
  {
    label: "10",
    min: 10,
    max: 19.9,
  },
  {
    label: "20",
    min: 20,
    max: 29.9,
  },
  {
    label: "30",
    min: 30,
    max: 40,
  },
];

const OUTDOOR_TEMPERATURE = [
  {
    value: 37,
    label: "Heat Wave",
    color: "#D10A04",
    show: true,
  },
  {
    value: 32,
    label: "Very Hot",
    color: "#C1240E",
  },
  {
    value: 26,
    label: "Hot",
    color: "#D93B27",
  },
  {
    value: 22,
    label: "Room Temperature",
    color: "#ED5F4D",
    show: true,
  },
  {
    value: 15,
    label: "Warm",
    color: "#0F0748",
  },
  {
    value: 10,
    label: "Mild",
    color: "#B3EEFF",
  },
  {
    value: 4,
    label: "Cool",
    color: "#6783EE",
  },
  {
    value: 0,
    label: "Water Freezes",
    color: "#3053DA",
    show: true,
  },
  {
    value: -6,
    label: "Cold",
    color: "#3426A5",
  },
  {
    value: -10,
    label: "Very Cold",
    color: "#1F1765",
  },
  {
    value: -17,
    label: "Life-threatening",
    color: "#0F0748",
    show: true,
  },
];

const AIR_POLLUTION_LIST = [
  {
    label: "Good",
    min: 0,
    max: 1,
  },
  {
    label: "Fair",
    min: 1,
    max: 2,
  },
  {
    label: "Moderate",
    min: 2,
    max: 3,
  },
  {
    label: "Poor",
    min: 3,
    max: 4,
  },
  {
    label: "Very Poor",
    min: 4,
    max: 5,
  },
];

export const getDescription = (value: number, list: IProgressList[]) => {
  return list.find((el) => el.min <= value && el.max >= value);
};

export default function AirConditions(props: IAirConditions) {
  const { data } = props;
  const { formatUnit, unit } = useUnit();
  const contents = [
    {
      label: "Humidity",
      key: "1",
      icon: <WaterDropIcon />,
      render: (value: any) => (
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
              children={value?.humidity + "%"}
            />
            <Typography
              fontWeight={500}
              sx={{ color: "GrayText", fontSize: "0.875rem" }}
              children={getDescription(value?.humidity, HUMIDITY_LIST)?.label}
            />
          </Box>

          <ProgressStep steps={HUMIDITY_LIST} value={value?.humidity} />
        </Stack>
      ),
    },
    {
      label: "Wind",
      key: "2",
      icon: <AirIcon />,
      render: (value: any) => (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <SemiCircle
            value={value?.wind}
            max={40}
            label={value?.wind + " km/h"}
          />
        </Box>
      ),
    },
    {
      label: "Feels like",
      key: "3",
      icon: <ThermostatIcon />,
      render: (value: any) => (
        <TemperatureBar list={OUTDOOR_TEMPERATURE} value={value?.feels_like} />
      ),
    },
    {
      label: "UV Index",
      key: "4",
      show: !!data?.uvIndex,
      icon: <Brightness7Icon />,
      render: (value: any) => (
        <SemiDonutChart list={UV_LIST} max={13} value={data?.uvIndex!!} />
      ),
    },
    {
      label: "Air Quality",
      key: "5",
      show: !!data?.airQuality,
      icon: <MasksIcon />,
      render: (value: any) => (
        <SemiDonutChart
          list={AIR_POLLUTION_LIST}
          max={5}
          value={data?.airQuality!!}
        />
      ),
    },
  ];

  return (
    <Grid
      spacing={3}
      container
      mt={1}
      sx={{
        ".step-label": {
          color: "GrayText",
          fontSize: "0.75rem",
        },
        ".apexcharts-pie-label": {
          fontSize: "0.75rem",
          color: "GrayText",
        },
      }}
    >
      {contents.map(
        (el) =>
          (el.show || el.show === undefined) && (
            <Grid
              item
              xs={4}
              key={el.key}
              display="flex"
              gap={2}
              sx={{
                ".icon": {
                  svg: { fontSize: 20, path: { fill: "white " } },
                },
              }}
            >
              <CardComponent p={3} width={"100%"}>
                <Box
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  width={"100%"}
                >
                  <Typography children={el.label} fontWeight={600} />
                  <Box
                    className="icon"
                    p={"4px"}
                    sx={{
                      background: "#5C9CE5",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {el.icon}
                  </Box>
                </Box>

                {el.render(data)}
              </CardComponent>
            </Grid>
          )
      )}
    </Grid>
  );
}
