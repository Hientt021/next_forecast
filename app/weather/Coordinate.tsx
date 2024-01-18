"use client";
import { setCoordinate } from "@/src/lib/redux/features/app/appSlice";
import { setCurrentLocation } from "@/src/lib/redux/features/location/locationSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import React, { useEffect } from "react";
export default function Coordinate() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (location) => {
        const latitude = location.coords.latitude.toString();
        const longitude = location.coords.longitude.toString();
        if (latitude && longitude)
          dispatch(setCoordinate({ latitude, longitude }));
      });
    }
  }, []);

  return null;
}