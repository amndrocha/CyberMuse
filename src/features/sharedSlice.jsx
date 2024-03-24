import { createSlice } from '@reduxjs/toolkit';

export const sharedSlice = createSlice({
  name: 'shared',
  initialState: {
    value: 0,
    theme: window.matchMedia("(prefers-color-scheme: dark)") ? 'dark-theme' : 'light-theme',
  },
  reducers: {
    switchTheme: (state, action) => {
      if (action.payload) {
        if (action.payload === 'dark') {
          state.theme = 'dark-theme';
        }
        else {
          state.theme = 'light-theme';
        }     
      } else {
        if (state.theme === 'light-theme') {
          state.theme = 'dark-theme';
        }
        else {
          state.theme = 'light-theme';
        }      
      }
    },
  }
})

export const { switchTheme } = sharedSlice.actions

export default sharedSlice.reducer