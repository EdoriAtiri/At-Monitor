import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../app/features/Auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
