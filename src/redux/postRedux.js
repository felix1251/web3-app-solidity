import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null
  },
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { setPost } = postSlice.actions;
export default postSlice.reducer;
