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
  PrecipitationLayerOptions,
  PressureLayer,
  PressureLayerOptions,
  RadarLayer,
  RadarLayerOptions,
  TemperatureLayer,
  TemperatureLayerOptions,
  WindLayer,
  WindLayerOptions,
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
    layer: (opt: PrecipitationLayerOptions) => new PrecipitationLayer(opt),
  },
  {
    value: "pressure",
    label: "Pressure",
    icon: <SpeedIcon />,
    colorRamp: ColorRamp.builtin.PRESSURE_2,
    layer: (opt: PressureLayerOptions) => new PressureLayer(opt),
  },
  {
    value: "temperature",
    label: "Temperature",
    icon: <DeviceThermostatIcon />,
    colorRamp: ColorRamp.builtin.TEMPERATURE_3,
    layer: (opt: TemperatureLayerOptions) => new TemperatureLayer(opt),
  },
  {
    value: "radar",
    label: "Radar",
    icon: <RadarIcon />,
    colorRamp: ColorRamp.builtin.RADAR,
    layer: (opt: RadarLayerOptions) => new RadarLayer(opt),
  },
  {
    value: "wind",
    label: "Wind",
    icon: <AirIcon />,
    colorRamp: ColorRamp.builtin.WIND_ROCKET,
    layer: (opt: WindLayerOptions) => new WindLayer(opt),
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
  const [layerValue, setLayerValue] = useState<any>("");
  const { query, onQueryChange } = useNavigate();
  const { latitude = 0, longitude = 0 } = query;
  const { unit, convertTemper, convertSpeed } = useUnit();
  const { temperature, wind } = unit;

  const onLayerChange = async (value: string) => {
    if (!map) return;

    if (layer) hidePrevLayer(layer);
    if (value) showNewLayer(value);
    setLayer(value);
  };

  const hidePrevLayer = (type: string) => {
    if (map && type) {
      map.setLayoutProperty(type, "visibility", "none");
      map.setPaintProperty("Water", "fill-color", "#85CBFA");
      removeColorRamp();
      setLayerValue("");
    }
  };

  const showNewLayer = async (type: string) => {
    if (!map) return;
    map.setPaintProperty("Water", "fill-color", "rgba(0, 0, 0, 0.4)");
    const curLayer: any = map.getLayer(type);
    if (curLayer) {
      map.setLayoutProperty(type, "visibility", "visibility");
      handleLayerValue(curLayer.implementation);
    } else addNewLayer(type);

    const selectedLayer = layers.find((el) => el.value === type);
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

  const addNewLayer = (type: string) => {
    const selectedLayer = layers.find((el) => el.value === type);
    if (selectedLayer) {
      const option = {
        id: selectedLayer.value,
        colorramp: selectedLayer.colorRamp,
      };
      const newLayer = selectedLayer.layer(option);
      newLayer.animateByFactor(1);
      map?.addLayer(newLayer, "Water");
      setTimeout(() => handleLayerValue(newLayer), 3000);
    }
  };

  const onMapClick = async (e: MapMouseEvent & Object) => {
    const { lng, lat } = e.lngLat;
    const coordinate = [lng, lat];
    const results = await geocoding.reverse(coordinate);
    const source = e.target.getSource("search-results") as GeoJSONSource;

    if (source) source.setData(results);
    setFeatures(results.features);
    map?.flyTo({
      center: coordinate as any,
      zoom: 19,
    });
  };

  const handleLayerValue = (curLayer: any) => {
    const curValue = curLayer?.pickAt(longitude, latitude);
    const value = curValue?.value || curValue?.speedMetersPerSecond;
    setLayerValue(convertUnitValue(value?.toFixed(1)));
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

    newMap.on("click", (e) =>
      onQueryChange({
        ...query,
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      })
    );
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
    if (latitude && longitude && map) {
      onMapClick({
        target: map,
        lngLat: {
          lat: Number(latitude),
          lng: Number(longitude),
        },
      } as any);
      onMarkerChange();
    }
  }, [latitude, longitude, map]);

  return (
    <Box
      p={3}
      sx={{ height: isMobileDevice ? "80vh" : "100%", position: "relative" }}
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
          sx={{
            position: "absolute",
            top: 40,
            left: 40,
            zIndex: 100,
            background: "white",
            borderRadius: 6,
            p: 1.5,
          }}
        >
          {features.map(
            (el, i) =>
              placesList.find((place) => place === el.place_type[0]) && (
                <Typography
                  key={i}
                  display={"inline"}
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
        <Box
          sx={{
            position: "absolute",
            top: 40,
            right: 40,
            zIndex: 100,
          }}
        >
          <Dropdown
            onValueChange={onLayerChange}
            icon={<LayersIcon sx={{ color: "white" }} />}
            label={"Layer"}
            options={layers}
            value={layer}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            right: 40,
            zIndex: 100,
          }}
        >
          {layerValue && (
            <Typography
              sx={{ fontSize: "1.5rem", fontWeight: 600, color: "#fff" }}
            >
              {layerValue} {unit[layer as keyof typeof unit]}
            </Typography>
          )}
        </Box>
        <Box
          id="map"
          ref={mapContainer}
          className="map"
          tabIndex={0}
          sx={{ height: "100%" }}
        />
      </CardComponent>
    </Box>
  );
}
