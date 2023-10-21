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
  'registrars/getRegistrar',
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

// Toggle registrar Activation
export const toggleRegistrarActivation = createAsyncThunk(
  'registrars/toggleRegistrarActivation',
  async ({ data, registrarId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await registrarService.toggleRegistrarActivation(
        data,
        registrarId,
        token
      )
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

// Delete a registrar
export const deleteRegistrar = createAsyncThunk(
  'registrars/deleteRegistrar',
  async (registrarId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token

      return await registrarService.deleteRegistrar(registrarId, token)
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

export const registrarSlice = createSlice({
  name: 'registrars',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    reset: (state) => initialState,
    updateIsSuccess: (state, action) => {
      state.isSuccess = action.payload // Set isSuccess to the payload value
    },
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
        state.registrar = action.payload
      })
      .addCase(getRegistrar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(toggleRegistrarActivation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(toggleRegistrarActivation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(toggleRegistrarActivation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteRegistrar.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteRegistrar.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
        // state.myEvent.filter((event) => event._id !== action.payload._id)
      })
      .addCase(deleteRegistrar.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, updateIsSuccess } = registrarSlice.actions
export default registrarSlice.reducer
