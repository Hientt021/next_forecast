"use client";
import api from "@/src/api/api";
import useAlert from "@/src/hook/useAlert";
import useNavigate from "@/src/hook/useNavigate";
import { setCity } from "@/src/lib/redux/features/app/appSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/store";
import PlaceIcon from "@mui/icons-material/Place";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
export interface IOptions {
  value: any;
  label: string;
}

export interface ICitiesSearch {}

export default function CitiesSearch(props: ICitiesSearch) {
  const { onQueryChange, query } = useNavigate();
  const { city } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const [cities, setCities] = useState<any>([]);
  const [value, setValue] = useState<string | null>(city);
  const [inputValue, setInputValue] = useState(city);

  const { showAlert } = useAlert();

  const getCities = async (name: string) => {
    try {
      if (name) {
        const citiesRes = await api.getCities({ q: name, limit: 5 });
        if (citiesRes) {
          setCities(citiesRes);
        }
      }
    } catch (error: any) {
      showAlert(error, "error");
    }
  };

  useEffect(() => {
    setValue(city);
  }, [city]);

  return (
    <Box display="flex" width="100%" alignItems={"center"}>
      <PlaceIcon sx={{ color: "white" }} />

      <Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
          const selected = cities.find((el: any) => el.name === newValue);
          onQueryChange({
            ...query,
            latitude: selected?.lat,
            longitude: selected?.lon,
          });
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          getCities(newInputValue);
        }}
        options={cities.map((el: any) => el.name)}
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
