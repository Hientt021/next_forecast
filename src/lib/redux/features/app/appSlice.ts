import { ICoordinate } from "@/app/(dashboard)/weather/page";
import { IHourForecast, ILocation } from "@/app/(dashboard)/weather/type";
import { IMessageType } from "@/src/hook/useAlert";
import { createSlice } from "@reduxjs/toolkit";

interface IMessage {
  type: IMessageType;
  content: string;
  autoClose?: boolean;
}
interface IAppSlice {
  unit: string;
  device: {
    name: string;
    isMobile: boolean;
    isMobileDevice: boolean;
    isIpad: boolean;
    isDesktop: boolean;
    isLaptop: boolean;
    width: number;
  };
  isAllowAccessLocation: boolean;
  current?: IHourForecast;
  location?: ILocation;
}

const initialState: IAppSlice = {
  unit: "metric",
  location: undefined,
  device: {
    name: "",
    isMobile: false,
    isIpad: false,
    isDesktop: false,
    isLaptop: false,
    isMobileDevice: false,
    width: 0,
  },
  isAllowAccessLocation: false,
  current: undefined,
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
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setAllowAccessLocation: (state, action) => {
      state.isAllowAccessLocation = action.payload;
    },
  },
});

export const {
  setUnit,
  setDevice,
  setLocation,
  setAllowAccessLocation,
  setCurrent,
} = appSlice.actions;
export default appSlice.reducer;
