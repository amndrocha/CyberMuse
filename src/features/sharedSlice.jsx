import { createSlice } from '@reduxjs/toolkit';

export const sharedSlice = createSlice({
  name: 'shared',
  initialState: {
    language: 'en',
    theme: window.matchMedia("(prefers-color-scheme: dark)") ? 'dark-theme' : 'light-theme',
    device: ' desktop',
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
    defineDevice: state => {
      state.device = ' mobile';
    },
    defineLanguage: (state, action) => {
      state.language = action.payload;
    }
  }
})

export const { switchTheme, defineDevice, defineLanguage } = sharedSlice.actions

export default sharedSlice.reducer