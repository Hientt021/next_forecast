"use client";

import CardComponent from "@/src/components/common/CardComponent";
import { MAP_KEY } from "@/src/const/token";
import { Box, Grid, Stack, Typography } from "@mui/material";

import Dropdown from "@/src/components/common/Dropdown";
import useNavigate from "@/src/hook/useNavigate";
import colorRampLegendControl, {
  COLOR_RAMP_CLASS,
} from "@/src/lib/maptiler/colorRampControl";
import {
  GeoJSONSource,
  GeocodingFeature,
  LngLat,
  LngLatBounds,
  Map,
  MapMouseEvent,
  MapStyle,
  Marker,
  config,
  geocoding,
} from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import {
  ColorRamp,
  PrecipitationLayer,
  PressureLayer,
  RadarLayer,
  TemperatureLayer,
  WindLayer,
} from "@maptiler/weather";
import AirIcon from "@mui/icons-material/Air";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import LayersIcon from "@mui/icons-material/Layers";
import RadarIcon from "@mui/icons-material/Radar";
import SpeedIcon from "@mui/icons-material/Speed";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import { useEffect, useMemo, useRef, useState } from "react";
import CitiesSearch from "../weather/components/CitiesSearch";
import { ICoordinate } from "../weather/WeatherPage";
import { useAppSelector } from "@/src/lib/redux/store";
import useUnit from "@/src/hook/useUnit";
import { TEMPERATURE_UNIT, WIND_UNIT } from "@/src/const/unit";

config.apiKey = MAP_KEY;
const layers = [
  {
    value: "precipitation",
    label: "Precipitation",
    icon: <ThunderstormIcon />,
    colorRamp: ColorRamp.builtin.PRECIPITATION,
  },
  {
    value: "pressure",
    label: "Pressure",
    icon: <SpeedIcon />,
    colorRamp: ColorRamp.builtin.PRESSURE_2,
  },
  {
    value: "temperature",
    label: "Temperature",
    icon: <DeviceThermostatIcon />,
    colorRamp: ColorRamp.builtin.TEMPERATURE_3,
  },
  {
    value: "radar",
    label: "Radar",
    icon: <RadarIcon />,
    colorRamp: ColorRamp.builtin.RADAR,
  },
  {
    value: "wind",
    label: "Wind",
    icon: <AirIcon />,
    colorRamp: ColorRamp.builtin.WIND_ROCKET,
  },
];

const placesList = [
  "address",
  "municipality",
  "municipal_district",
  "subregion",
  "country",
];

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const { location, device } = useAppSelector((state) => state.app);
  const { isMobileDevice } = device;
  const [map, setMap] = useState<Map | undefined>();
  const [layer, setLayer] = useState("");
  const [features, setFeatures] = useState<GeocodingFeature[]>([]);
  const [marker, setMarker] = useState<Marker | null>(null);
  const { query, onQueryChange } = useNavigate();
  const { latitude = 0, longitude = 0 } = query;
  const { unit, convertTemper, convertSpeed } = useUnit();
  const { temperature, wind } = unit;

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

    if (alreadyExist) map.setLayoutProperty(value, "visibility", "visibility");
    else {
      const newLayer = getLayer(value);
      if (newLayer) {
        map.addLayer(newLayer, "Water");
      }
    }
    const selectedLayer = layers.find((el) => el.value === value);
    const colorValue = getColorRamp(selectedLayer?.colorRamp);

    const newControl = new colorRampLegendControl({
      colorRamp: selectedLayer?.colorRamp,
      colorValue: colorValue,
      unit: unit[selectedLayer?.value as keyof typeof unit],
    });

    map.addControl(newControl, "bottom-left");
  };

  const removeColorRamp = () => {
    const colorRamp = document.getElementsByClassName(COLOR_RAMP_CLASS)[0];

    const parent = colorRamp.parentNode;
    parent?.removeChild(colorRamp);
  };

  const getColorRamp = (colorRamp: any) => {
    const maxLength = 9;
    const min = convertUnitValue(colorRamp.getBounds().min);
    const max = convertUnitValue(colorRamp.getBounds().max);
    const boundRange = max - min;
    const boundValue = boundRange / maxLength;
    const result = [];
    for (let i = 0; i <= maxLength; i++) {
      const value = !i
        ? min
        : i === maxLength - 1
        ? max
        : Math.round(min + i * boundValue);
      result.push({ value: Math.round(value) });
    }
    return result;
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
        const wind = new WindLayer(option);
        return wind;
      }
      default:
        return null;
    }
  };

  const onMapClick = async (e: MapMouseEvent & Object) => {
    const { lng, lat } = e.lngLat;
    const results = await geocoding.reverse([lng, lat]);
    const source = e.target.getSource("search-results") as GeoJSONSource;

    if (source) source.setData(results);
    setFeatures(results.features);
    onQueryChange({ ...query, latitude: lat, longitude: lng });
  };

  const convertUnitValue = (value: string) => {
    switch (layer) {
      case "temperature": {
        return temperature === TEMPERATURE_UNIT.CELSIUS
          ? Number(value)
          : convertTemper(Number(value), TEMPERATURE_UNIT.FAHRENHEIT);
      }
      case "wind": {
        return wind === WIND_UNIT.METER_PER_SECOND
          ? Number(value)
          : convertSpeed(Number(value), WIND_UNIT.KILOMETER_PER_HOUR);
      }
      default:
        return Number(value);
    }
  };

  const onMarkerChange = () => {
    if (map) {
      if (marker) {
        marker.remove();
      }
      const newMarker = new Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
      setMarker(newMarker);
    }
  };

  useEffect(() => {
    const newMap = new Map({
      container: mapContainer.current!!,
      style: MapStyle.STREETS,
      center: [longitude, latitude],
      zoom: latitude && longitude ? 12 : 0,
      minZoom: 0,
      maxZoom: 28,
    });
    setMap(newMap);

    newMap.on("click", onMapClick);
    newMap.on("load", (e) => {
      newMap.addSource("search-results", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
      newMap.addLayer({
        id: "point-result",
        type: "circle",
        source: "search-results",
        paint: {
          "circle-radius": 8,
          "circle-color": "#B42222",
          "circle-opacity": 0.5,
        },
        filter: ["==", "$type", "Point"],
      });
    });
    return () => setMap(undefined);
  }, []);

  useEffect(() => {
    if (layer === "temperature" || layer === "wind") {
      onLayerChange(layer);
    }
  }, [wind, temperature]);

  useEffect(() => {
    onMarkerChange();
  }, [latitude, longitude, map]);

  useEffect(() => {
    console.log(features);
  }, [features]);

  return (
    <Grid container p={3} height={"100%"}>
      <Grid
        item
        mobile={12}
        laptop={3}
        px={2}
        height={isMobileDevice ? "auto" : "100%"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <CitiesSearch
            onChange={(coordinate) =>
              map &&
              onMapClick({
                target: map,
                lngLat: {
                  lat: Number(coordinate.latitude),
                  lng: Number(coordinate.longitude),
                },
              } as any)
            }
            placeholder="Cities search"
          />
          <Dropdown
            onValueChange={onLayerChange}
            icon={<LayersIcon sx={{ color: "white" }} />}
            label={"Layer"}
            options={layers}
            value={layer}
          />
        </Box>
        <Box>
          {features.map(
            (el, i) =>
              placesList.find((place) => place === el.place_type[0]) && (
                <Typography
                  key={i}
                  display={"inline"}
                  color="white"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    if (map) {
                      const bound = new LngLatBounds(el.bbox as any);
                      map.fitBounds(bound);
                    }
                  }}
                >
                  {i > 0 && ", "}
                  {el.text}
                </Typography>
              )
          )}
        </Box>
      </Grid>
      <Grid
        item
        mobile={12}
        laptop={9}
        sx={{ height: isMobileDevice ? "80vh" : "100%" }}
      >
        <CardComponent
          sx={{
            height: "100%",
            "div.maplibregl-ctrl, div.maplibregl-ctrl-attrib-inner": {
              display: "none !important",
            },
          }}
        >
          <Box
            id="map"
            ref={mapContainer}
            className="map"
            tabIndex={0}
            sx={{ height: "100%" }}
          />
        </CardComponent>
      </Grid>
    </Grid>
  );
}
