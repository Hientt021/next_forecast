import { ICoordinate } from "@/app/weather/page";
import { ICurrentForecast } from "@/app/weather/type";
import { IMessageType } from "@/src/components/MessageContainer";
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
  messages: IMessage[];
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
  messages: [],
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
    setMessages: (state, action) => {
      state.messages = [
        ...state.messages,
        { ...action.payload, autoClose: action.payload || true },
      ];
    },
    setAllowAccessLocation: (state, action) => {
      state.isAllowAccessLocation = action.payload;
    },
  },
});

export const {
  setUnit,
  setDevice,
  setCity,
  setMessages,
  setAllowAccessLocation,
} = appSlice.actions;
export default appSlice.reducer;
