import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'user',
  initialState: {
    name: '',
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    }
  }
})

export const { setName } = slice.actions;
export default slice.reducer;