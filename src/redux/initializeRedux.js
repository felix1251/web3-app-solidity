import { createSlice } from "@reduxjs/toolkit";

const initializeSlice = createSlice({
  name: "initialize",
  initialState: {
    isDownloaded: false,
    networkData: null
  },
  reducers: {
    setIsDownloaded: (state, action) => {
      state.isDownloaded = action.payload;
    },
    setNetwork: (state, action) => {
      state.networkData = action.payload;
    },
  },
});

export const { setIsDownloaded, setNetwork } = initializeSlice.actions;
export default initializeSlice.reducer;
