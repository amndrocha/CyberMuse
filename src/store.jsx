import { configureStore } from '@reduxjs/toolkit'
import sharedReducer from './features/sharedSlice';
import homeReducer from './features/homeSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    shared: sharedReducer,
  }
})

export default store;