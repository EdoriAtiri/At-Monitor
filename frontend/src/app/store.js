import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../app/features/Auth/authSlice'
import eventReducer from '../app/features/Events/eventSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    myEvents: eventReducer,
  },
})
