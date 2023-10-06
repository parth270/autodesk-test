import { createSlice } from "@reduxjs/toolkit";

const threeSlice = createSlice({
  name: "home",
  initialState: {
    AccessToken: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.AccessToken = action.payload;
    },
    setAny: (state, action) => {
      state[action.payload.label] = action.payload.value;
    },
  },
});

export const { setToken,setAny } = threeSlice.actions;

export default threeSlice.reducer;
