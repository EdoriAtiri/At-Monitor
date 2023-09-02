import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  myEvents: [],
  event: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get admin events
export const getEvents = createAsyncThunk(
  'events/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await eventService.getEvents(token)
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

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.myEvents = action.payload
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = eventSlice.actions
export default eventSlice.reducer
