import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currUser: null,
    address: "",
    followerCount: 0
  },
  reducers: {
    setUser: (state, action) => {
      state.currUser = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setFollowerCount: (state, action) => {
      state.followerCount = action.payload;
    },
  },
});

export const { setUser, setAddress, setFollowerCount } = userSlice.actions;
export default userSlice.reducer;
