import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        language: 'eng'
    },
    reducers: {
        switchLanguage: (state, action) => {
            state.language = action.payload;
        },
    }
});

export const { switchLanguage } = dataSlice.actions;

export default dataSlice.reducer;
