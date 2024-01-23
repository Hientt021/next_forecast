import { ICoordinate } from "@/app/weather/page";
import { ICurrentForecast } from "@/app/weather/type";
import { IMessageType } from "@/src/hook/useAlert";
import { createSlice } from "@reduxjs/toolkit";

interface IMessage {
  type: IMessageType;
  content: string;
  autoClose?: boolean;
}
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
  isAllowAccessLocation: boolean;
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
  isAllowAccessLocation: false,
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

    setAllowAccessLocation: (state, action) => {
      state.isAllowAccessLocation = action.payload;
    },
  },
});

export const { setUnit, setDevice, setCity, setAllowAccessLocation } =
  appSlice.actions;
export default appSlice.reducer;
