import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import registrarService from './registrarService'

const initialState = {
  registrars: [],
  registrar: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}
