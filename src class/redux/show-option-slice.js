import { createSlice } from "@reduxjs/toolkit";

export const showOptionsSlice = createSlice({
  name: "showOptions",
  initialState: false,
  reducers: {
    updateShowOptions: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateShowOptions } = showOptionsSlice.actions;

export default showOptionsSlice.reducer;