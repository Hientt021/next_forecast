import * as React from "react";
import { Metadata } from "next";
import MapPage from "./MapPage";
export interface IMapProps {}
export const metadata: Metadata = {
  title: "Map",
};

export default function Map(props: IMapProps) {
  return <MapPage />;
}
