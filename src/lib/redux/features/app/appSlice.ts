import { ICoordinate } from "@/app/weather/page";
import { ICurrentForecast } from "@/app/weather/type";
import { createSlice } from "@reduxjs/toolkit";

interface IAppSlice {
  forecast: {
    current?: ICurrentForecast;
    list: ICurrentForecast[];
  };
  unit: string;
  coordinate: ICoordinate;
}

const initialState: IAppSlice = {
  forecast: {
    current: undefined,
    list: [],
  },
  unit: "metric",
  coordinate: {
    latitude: "",
    longitude: "",
  },
};

export const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setCoordinate: (state, action) => {
      state.coordinate = action.payload;
    },
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    setForecast: (state, action) => {
      state.forecast.current = action.payload;
    },
    setWeeklyList: (state, action) => {
      state.forecast.list = action.payload;
    },
  },
});

export const { setCoordinate, setUnit, setForecast, setWeeklyList } =
  appSlice.actions;
export default appSlice.reducer;
