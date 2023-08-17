import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from './authService'

// Get admin from local storage
const admin = JSON.parse(localStorage.getItem('admin'))

const initialState = {
  admin: admin ? admin : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Signup a new admin
export const signup = createAsyncThunk(
  'auth/signup',
  async (admin, thunkAPI) => {
    try {
      return await authService.signup(admin)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)
