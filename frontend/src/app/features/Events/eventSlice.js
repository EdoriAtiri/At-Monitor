import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  myEvents: [],
  event: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}
