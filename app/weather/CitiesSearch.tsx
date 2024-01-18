"use client";
import { CITIES_TOKEN } from "@/src/const/token";
import { setCurrentLocation } from "@/src/lib/redux/features/location/locationSlice";
import { useAppDispatch } from "@/src/lib/redux/store";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useSWR from "swr";

export interface ICityProps {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  is_capital: boolean;
  label?: string;
}

export interface ICitiesSearch {
  onSearch?: (city: ICityProps) => void;
}

export default function CitiesSearch({ onSearch }: ICitiesSearch) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [cities, setCities] = useState([]);
  const api = `https://api.api-ninjas.com/v1/city?name=${name}&limit=30`;
  const { data: citiesData } = useSWR(
    name ? [api, CITIES_TOKEN] : null,
    ([url, token]) =>
      fetch(url, {
        headers: {
          "X-Api-Key": token,
        },
      }).then((res) => res.json())
  );

  useEffect(() => {
    if (citiesData)
      setCities(
        citiesData.map((el: ICityProps) => ({ ...el, label: el.name }))
      );
  }, [citiesData]);

  return (
    <Autocomplete
      options={cities}
      onChange={(e, value: ICityProps | null) =>
        value && dispatch(setCurrentLocation(value))
      }
      onInputChange={(e, value) => setName(value)}
      sx={{
        ".MuiOutlinedInput-notchedOutline": {
          border: "none",
        },

        "input, label": { color: "white" },
        borderRadius: 3,
        width: "66%",
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search for cities" />
      )}
      popupIcon={false}
    />
  );
}
