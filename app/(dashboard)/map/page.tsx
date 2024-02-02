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
import { LngLat, Map, MapStyle, config, geocoding } from "@maptiler/sdk";
import CitiesSearch from "../weather/components/CitiesSearch";
import useNavigate from "@/src/hook/useNavigate";
import { ICoordinate } from "../weather/page";
import Dropdown from "@/src/components/common/Dropdown";
import LayersIcon from "@mui/icons-material/Layers";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import SpeedIcon from "@mui/icons-material/Speed";
import AirIcon from "@mui/icons-material/Air";
config.apiKey = MAP_KEY;

const options = [
  {
    value: "pressure",
    label: "Pressure",
    icon: <SpeedIcon />,
  },

  {
    value: "temperature",
    label: "Temperature",
    icon: <DeviceThermostatIcon />,
  },
  {
    value: "wind",
    label: "Wind",
    icon: <AirIcon />,
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
    if (value === layer) {
      const prevLayer = map.getLayer(layer);
      if (prevLayer) map.setLayoutProperty(layer, "visibility", "none");
      setLayer("");
    } else {
      const prevLayer = map.getLayer(layer);
      if (prevLayer) map.setLayoutProperty(layer, "visibility", "none");

      const currentLayer = map.getLayer(value);
      if (currentLayer)
        map.setLayoutProperty(value, "visibility", "visibility");
      else {
        const newLayer = getLayer(value);
        if (newLayer) map.addLayer(newLayer, "Water");
      }
      setLayer(value);
    }
  };

  const getLayer = (type: string) => {
    switch (type) {
      case "pressure": {
        const pressure = new PressureLayer({ id: "pressure" });
        return pressure;
      }

      case "temperature": {
        const temperature = new TemperatureLayer({
          id: "temperature",
        });
        return temperature;
      }
      case "wind": {
        const wind = new WindLayer({ id: "wind" });
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
      zoom: latitude && longitude ? 14 : 0,
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
            options={options}
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
