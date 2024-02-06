import { ICoordinate } from "@/app/(dashboard)/weather/page";
import { IHourForecast, ILocation } from "@/app/(dashboard)/weather/type";
import {
  PRECIPITATION_UNIT,
  PRESSURE_UNIT,
  RADAR_UNIT,
  TEMPERATURE_UNIT,
  WIND_UNIT,
} from "@/src/const/unit";
import { IMessageType } from "@/src/hook/useAlert";
import { createSlice } from "@reduxjs/toolkit";

interface IMessage {
  type: IMessageType;
  content: string;
  autoClose?: boolean;
}
interface IAppSlice {
  unit: IUnit;
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

interface IUnit {
  temperature: string;
  precipitation: string;
  pressure: string;
  radar: string;
  wind: string;
}

const defaultUnit = {
  temperature: TEMPERATURE_UNIT.CELSIUS,
  precipitation: PRECIPITATION_UNIT.MILLILITER_PER_HOUR,
  pressure: PRESSURE_UNIT.HECTOR_PASCAL,
  radar: RADAR_UNIT.METEOROLOGY,
  wind: WIND_UNIT.METER_PER_SECOND,
};

const initialState: IAppSlice = {
  unit: defaultUnit,
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
      state.unit = {
        ...state.unit,
        [action.payload.type]: action.payload.value,
      };
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
