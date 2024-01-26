"use client";
import { getCities } from "@/src/actions";
import api from "@/src/api/api";
import useAlert from "@/src/hook/useAlert";
import useNavigate from "@/src/hook/useNavigate";
import PlaceIcon from "@mui/icons-material/Place";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
export interface IOptions {
  value: any;
  label: string;
}

export interface ICitiesSearch {
  defaultValue?: string;
}

export default function CitiesSearch(props: ICitiesSearch) {
  const { defaultValue = "" } = props;
  const { onQueryChange, query } = useNavigate();
  const [cities, setCities] = useState<any>([]);
  const [value, setValue] = useState<string | null>(defaultValue);
  const [inputValue, setInputValue] = useState(defaultValue);

  const { showAlert } = useAlert();

  const getCitiesData = async (name: string) => {
    try {
      if (name) {
        const res = await getCities(name);
        if (res) {
          setCities(res);
        }
      }
    } catch (error: any) {
      showAlert(error, "error");
    }
  };

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

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
          getCitiesData(newInputValue);
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
        clearIcon={false}
      />
    </Box>
  );
}
