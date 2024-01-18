import { createSlice } from "@reduxjs/toolkit";

interface IWeatherSlice {
  weather: any;
}

const initialState: IWeatherSlice = {
  weather: {
    latitude: "",
    longitude: "",
  },
};

export const WeatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => (state.weather = action.payload),
  },
});

export const { setCurrentLocation } = WeatherSlice.actions;
export default WeatherSlice.reducer;
