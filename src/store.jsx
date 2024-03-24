import { configureStore } from '@reduxjs/toolkit'
import sharedReducer from './features/sharedSlice';

const store = configureStore({
  reducer: {
    shared: sharedReducer,
  }
})

export default store;