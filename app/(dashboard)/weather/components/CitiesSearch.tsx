"use client";
import { getCities } from "@/src/actions";
import api from "@/src/api/api";
import useAlert from "@/src/hook/useAlert";
import useNavigate from "@/src/hook/useNavigate";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Modal,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ICoordinate } from "../WeatherPage";
import { useAppSelector } from "@/src/lib/redux/store";
export interface IOptions {
  value: any;
  label: string;
}

export interface ICitiesSearch {
  defaultValue?: string;
  placeholder?: string;
  onChange?: (newCoordinate: ICoordinate) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  p: 2,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 4,
};

export default function CitiesSearch(props: ICitiesSearch) {
  const {
    defaultValue = "",
    placeholder = "Search your city",
    onChange,
  } = props;
  const { onQueryChange, query } = useNavigate();
  const { isMobile } = useAppSelector((state) => state.app.device);
  const [cities, setCities] = useState<any>([]);
  const [value, setValue] = useState<string>(defaultValue);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { showAlert } = useAlert();

  const getCitiesData = async (name: string) => {
    try {
      if (name) {
        setLoading(true);
        const res = await getCities(name);
        if (res) {
          setCities(res);
        }
      }
    } catch (error: any) {
      showAlert(error, "error");
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    <Autocomplete
      autoSelect={false}
      loading={loading}
      value={value}
      onChange={(event: any, newValue: string) => {
        const selected = cities.find((el: any) => el.name === newValue);
        if (selected) {
          setValue(newValue);
          onQueryChange({
            ...query,
            latitude: selected.lat,
            longitude: selected.lon,
          });
          onChange &&
            onChange({ latitude: selected.lat, longitude: selected.lon });
        }
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

        "input, label": { color: isMobile ? "black" : "white" },
        borderRadius: 3,
      }}
      disableClearable
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          onClick={() => value && getCitiesData(value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      popupIcon={false}
      fullWidth
      clearIcon={false}
    />
  );

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Box
      display="flex"
      width="100%"
      alignItems={"center"}
      minWidth={active ? 300 : 0}
      height={30}
    >
      <SearchIcon
        sx={{ color: "white" }}
        onClick={() =>
          isMobile ? setOpenModal(true) : setActive((prev) => !prev)
        }
      />
      {active && renderInput}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style}>{renderInput}</Box>
      </Modal>
    </Box>
  );
}
