"use client";

import CardComponent from "@/src/components/common/CardComponent";
import { MAP_KEY } from "@/src/const/token";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Skeleton,
  Switch,
} from "@mui/material";

import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useEffect, useRef, useState } from "react";
import {
  PrecipitationLayer,
  PressureLayer,
  RadarLayer,
  TemperatureLayer,
  WindLayer,
} from "@maptiler/weather";
import {
  IControl,
  LngLat,
  Map,
  MapStyle,
  config,
  geocoding,
} from "@maptiler/sdk";
import CitiesSearch from "../weather/components/CitiesSearch";
import useNavigate from "@/src/hook/useNavigate";
import { ICoordinate } from "../weather/page";
import Dropdown from "@/src/components/common/Dropdown";
import LayersIcon from "@mui/icons-material/Layers";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import SpeedIcon from "@mui/icons-material/Speed";
import AirIcon from "@mui/icons-material/Air";
import { ColorRamp } from "@maptiler/weather";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import RadarIcon from "@mui/icons-material/Radar";
import colorRampLegendControl from "@/src/lib/maptiler/colorRampControl";
// Let's use the builtin Viridis color ramp,

config.apiKey = MAP_KEY;

const layers = [
  {
    value: "precipitation",
    label: "Precipitation",
    icon: <ThunderstormIcon />,
    colorRamp: ColorRamp.builtin.PRECIPITATION,
    unit: "mm",
  },
  {
    value: "pressure",
    label: "Pressure",
    icon: <SpeedIcon />,
    colorRamp: ColorRamp.builtin.PRESSURE_2,
    unit: "hPa",
  },
  {
    value: "temperature",
    label: "Temperature",
    icon: <DeviceThermostatIcon />,
    colorRamp: ColorRamp.builtin.TEMPERATURE_3,
    unit: "dBZ",
  },
  {
    value: "radar",
    label: "Radar",
    icon: <RadarIcon />,
    colorRamp: ColorRamp.builtin.RADAR,
    unit: "°",
  },
  {
    value: "wind",
    label: "Wind",
    icon: <AirIcon />,
    colorRamp: ColorRamp.builtin.WIND_ROCKET,
    unit: "m/s",
  },
];

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | undefined>();
  const [layer, setLayer] = useState("");

  const { query } = useNavigate();

  const onCoordinateChange = (coordinate: ICoordinate) => {
    const { latitude, longitude } = coordinate;
    if (map)
      map.flyTo({
        center: [Number(longitude), Number(latitude)],
      });
  };

  const onLayerChange = (value: string) => {
    if (!map) return;

    hidePrevLayer();
    if (value) showNewLayer(value);
    setLayer(value);
  };

  const hidePrevLayer = () => {
    if (map && layer) {
      map.setLayoutProperty(layer, "visibility", "none");
      removeColorRamp();
    }
  };

  const showNewLayer = (value: string) => {
    if (!map) return;
    const alreadyExist = !!map.getLayer(value);
    const selectedLayer = layers.find((el) => el.value === value);

    if (alreadyExist) map.setLayoutProperty(value, "visibility", "visibility");
    else {
      const newLayer = getLayer(value);
      if (newLayer) {
        map.addLayer(newLayer, "Water");
      }
    }
    const newControl = new colorRampLegendControl({
      colorRamp: selectedLayer?.colorRamp,
    });

    map.addControl(newControl, "bottom-left");
    const colorRamp = document.getElementsByClassName("color-ramp-label")[0];
    if (colorRamp) {
      const unit = document.createElement("span");
      if (unit) {
        unit.innerHTML = selectedLayer?.unit || "";
        colorRamp.appendChild(unit);
      }
    }
  };

  const removeColorRamp = () => {
    const colorRamp = document.getElementsByClassName(
      "maplibregl-ctrl maplibregl-ctrl-color-ramp"
    )[0];

    const parent = colorRamp.parentNode;
    parent?.removeChild(colorRamp);
  };

  const getLayer = (type: string) => {
    const selectedLayer = layers.find((el) => el.value === type);
    const option = {
      id: selectedLayer?.value,
      colorramp: selectedLayer?.colorRamp,
    };
    switch (type) {
      case "precipitation": {
        const precipitation = new PrecipitationLayer(option);
        return precipitation;
      }
      case "radar": {
        const radar = new RadarLayer(option);
        return radar;
      }
      case "pressure": {
        const pressure = new PressureLayer(option);
        return pressure;
      }

      case "temperature": {
        const temperature = new TemperatureLayer(option);
        return temperature;
      }
      case "wind": {
        const wind = new WindLayer({
          id: selectedLayer?.value,
          colorramp: selectedLayer?.colorRamp,
        });
        return wind;
      }
      default:
        return null;
    }
  };

  const onMapClick = async (lngLat: LngLat) => {
    const { lng, lat } = lngLat;
    const result = await geocoding.reverse([lng, lat]);
    console.log(result);
  };

  useEffect(() => {
    const { latitude = 0, longitude = 0 } = query;

    const newMap = new Map({
      container: mapContainer.current!!,
      style: MapStyle.STREETS,
      center: [longitude, latitude],
      zoom: latitude && longitude ? 0 : 0,
      minZoom: 0,
      maxZoom: 28,
    });
    setMap(newMap);

    newMap.on("click", (e) => {
      onMapClick(e.lngLat);
    });
    return () => setMap(undefined);
  }, []);

  return (
    <Grid container height={"100%"} p={3}>
      <Grid item laptop={3} px={2}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <CitiesSearch
            onChange={onCoordinateChange}
            placeholder="Cities search"
          />
          <Dropdown
            onValueChange={onLayerChange}
            icon={<LayersIcon sx={{ color: "white" }} />}
            label={"Layer"}
            options={layers}
          />
        </Box>
      </Grid>
      <Grid item laptop={9}>
        <CardComponent sx={{ height: "100%", width: "100%" }}>
          <Box
            id="map"
            ref={mapContainer}
            className="map"
            tabIndex={0}
            sx={{ height: "100%", width: "100%" }}
          />
        </CardComponent>
      </Grid>
    </Grid>
  );
}
