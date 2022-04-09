import { createSlice } from "@reduxjs/toolkit";

const initializeSlice = createSlice({
  name: "initialize",
  initialState: {
    isDownloaded: false,
    activeStep: 0,
    network: null
  },
  reducers: {
    setIsDownloaded: (state, action) => {
      state.isDownloaded = action.payload;
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    setNetwork: (state, action) => {
      state.network = action.payload;
    },
  },
});

export const { setIsDownloaded, setActiveStep, setNetwork } = initializeSlice.actions;
export default initializeSlice.reducer;
