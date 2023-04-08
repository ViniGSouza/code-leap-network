import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: 'update',
  initialState: {
    title: '',
    content: ''
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    }
  }
})

export const { setTitle, setContent } = slice.actions;
export default slice.reducer;