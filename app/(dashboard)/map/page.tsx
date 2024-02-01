"use client";

import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import { useEffect, useRef, useState } from "react";

export default function MapPage() {
  const mapWrapper = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [0, 0],
      zoom: 2,
    }),
  });

  const mapTargetElement = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | undefined>();

  useEffect(() => {
    const map = new Map({
      layers: [new TileLayer({ source: new OSM() })],
      //   controls: [fullScreenControl, scaleLineControl, zoomControl, attrControl, mousePositionControl, rotateControl, zoomSliderControl],
      view: new View({
        center: [0, 0],
        zoom: 0,
        minZoom: 0,
        maxZoom: 28,
      }),
    });
    map.setTarget(mapTargetElement.current || "");
    map.on("click", (e) => {
      const point = map.getCoordinateFromPixel(e.pixel);
      const zoom = map.getView().getZoom();
      console.log(...point, zoom);
    });
    setMap(map);
    return () => map.setTarget("");
  }, []);

  return (
    <>
      <div
        id="map"
        ref={mapTargetElement}
        className="map"
        tabIndex={0}
        style={{ height: "100%" }}
      ></div>
    </>
  );
}