"use client";
import { CITIES_TOKEN } from "@/src/const/token";
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
  onSearch: (city: ICityProps) => void;
}

export default function CitiesSearch({ onSearch }: ICitiesSearch) {
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
      onChange={(e, value: ICityProps | null) => value && onSearch(value)}
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
