import { createSlice } from '@reduxjs/toolkit';

export const homeSlice = createSlice({
  name: 'home',
  initialState: {
    sentEmail: false,
  },
  reducers: {
    sendEmail: (state, action) => {
      state.sentEmail = true;
    },
  }
})

export const { sendEmail } = homeSlice.actions

export default homeSlice.reducer