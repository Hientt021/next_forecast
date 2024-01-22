"use client";
import { CITIES_TOKEN } from "@/src/const/token";
import useNavigate from "@/src/hook/useNavigate";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useSWR from "swr";
import PlaceIcon from "@mui/icons-material/Place";
import { callApi } from "@/src/api/callApi";
import { CITIES_API } from "@/src/api/const";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import { setCity } from "@/src/lib/redux/features/app/appSlice";
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

export default function CitiesSearch(props: ICitiesSearch) {
  const { onQueryChange, query } = useNavigate();
  const { city } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [cities, setCities] = useState<ICityProps[]>([]);
  const [inputValue, setInputValue] = useState(city);

  const getCities = async (name: string) => {
    if (name) {
      setInputValue(name);

      const citiesRes = await callApi(
        CITIES_API,
        {
          name: name,
          limit: 30,
        },
        {
          headers: {
            "X-Api-Key": CITIES_TOKEN,
          },
        }
      );
      if (citiesRes) {
        const formatCities = citiesRes.map((el: ICityProps) => ({
          ...el,
          label: el.name,
        }));
        setCities(formatCities);
      }
    }
  };

  return (
    <Box display="flex" width="100%" alignItems={"center"}>
      <PlaceIcon sx={{ color: "white" }} />

      <Autocomplete
        options={cities}
        inputValue={inputValue}
        onChange={(e, value) => {
          if (value) {
            onQueryChange({
              ...query,
              latitude: value.latitude,
              longitude: value.longitude,
            });
            dispatch(setCity(value.name));
          }
        }}
        onInputChange={(e, value) => getCities(value)}
        sx={{
          ".MuiOutlinedInput-notchedOutline": {
            border: "none",
          },

          "input, label": { color: "white" },
          borderRadius: 3,
        }}
        renderInput={(params) => <TextField {...params} />}
        popupIcon={false}
        fullWidth
      />
    </Box>
  );
}
