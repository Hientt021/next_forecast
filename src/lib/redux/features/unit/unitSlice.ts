import { IUnit, UNIT } from "@/app/weather/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUnitSlice {
  unit: string;
}

const initialState: IUnitSlice = {
  unit: "metric",
};

export const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    setCurrentUnit: (state, action) => {
      state.unit = action.payload;
      console.log(action.payload);
    },
  },
});

export const { setCurrentUnit } = unitSlice.actions;
export default unitSlice.reducer;
