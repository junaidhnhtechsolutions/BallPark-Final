import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  showIntro: true,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setShowIntro(state, action) {
      state.showIntro = action.payload;
    },
  },
});

export const { setShowIntro } = loaderSlice.actions;
export default loaderSlice.reducer;
