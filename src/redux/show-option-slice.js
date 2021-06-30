import { createSlice } from "@reduxjs/toolkit";

export const showOptionsSlice = createSlice({
  name: "showOptions",
  initialState: false,
  reducers: {
    updateShowOptions: (state, action) => {
      return action.payload; // action.payload 是updateShowOptions的入参，state是原来的数据
    },
  },
});

export const { updateShowOptions } = showOptionsSlice.actions;

export default showOptionsSlice.reducer;
