import { ICoordinate } from "@/app/weather/page";
import { createSlice } from "@reduxjs/toolkit";

interface ILocationSlice {
  location: ICoordinate;
}

const initialState: ILocationSlice = {
  location: {
    latitude: "",
    longitude: "",
  },
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setCurrentLocation } = locationSlice.actions;
export default locationSlice.reducer;
