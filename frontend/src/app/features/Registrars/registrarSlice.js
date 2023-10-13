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

// Get registrars
export const getRegistrars = createAsyncThunk(
  'registrars/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await registrarService.getRegistrars(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      console.log(message)

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get a registrar
export const getRegistrar = createAsyncThunk(
  'events/getRegistrar',
  async (registrarId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await registrarService.getRegistrar(registrarId, token)
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

export const registrarSlice = createSlice({
  name: 'registrars',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    reset: (state) => initialState,
    // resetSuccess: (state) => (state.isSuccess = false),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegistrars.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRegistrars.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.registrars = action.payload
      })
      .addCase(getRegistrars.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getRegistrar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRegistrar.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.myEvent = action.payload
      })
      .addCase(getRegistrar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, resetSuccess } = registrarSlice.actions
export default registrarSlice.reducer
