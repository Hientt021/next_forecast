import { ICoordinate } from "@/app/weather/page";
import { ICurrentForecast } from "@/app/weather/type";
import { createSlice } from "@reduxjs/toolkit";

interface IAppSlice {
  unit: string;
  city: string;
  device: {
    name: string;
    isMobile: boolean;
    isIpad: boolean;
    isDesktop: boolean;
    width: number;
  };
}

const initialState: IAppSlice = {
  unit: "metric",
  city: "",
  device: {
    name: "",
    isMobile: false,
    isIpad: false,
    isDesktop: false,
    width: 0,
  },
};

export const appSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    setDevice: (state, action) => {
      state.device = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { setUnit, setDevice, setCity } = appSlice.actions;
export default appSlice.reducer;
