import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import memberService from './memberService'

const initialState = {
  members: [],
  member: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get admin members
export const getMembers = createAsyncThunk(
  'members/getAllMembers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await memberService.getMembers(token)
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

// Get an admin member
export const getMember = createAsyncThunk(
  'members/getMember',
  async (memberId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token
      return await memberService.getMember(memberId, token)
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

// Create New Member
export const createMember = createAsyncThunk(
  'members/createMember',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token

      return await memberService.createMember(data, token)
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
// // Edit an event
// export const editEvent = createAsyncThunk(
//   'events/editEvent',
//   async ({ data, eventId }, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.admin.token

//       return await eventService.editEvent(data, eventId, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()

//       console.log(message)

//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

// // Delete an event
// export const deleteEvent = createAsyncThunk(
//   'events/deleteEvent',
//   async (eventId, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.admin.token

//       return await eventService.deleteEvent(eventId, token)
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()

//       console.log(message)

//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.members = action.payload
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMember.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMember.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.member = action.payload
      })
      .addCase(getMember.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
    //   .addCase(createEvent.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(createEvent.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.myEvents = [action.payload, ...state.myEvents]
    //   })
    //   .addCase(createEvent.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    //   })
    //   .addCase(editEvent.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(editEvent.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.myEvent = action.payload
    //   })
    //   .addCase(editEvent.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    //   })
    //   .addCase(deleteEvent.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(deleteEvent.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.myEvent.filter((event) => event._id !== action.payload._id)
    //   })
    //   .addCase(deleteEvent.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    //   })
  },
})

export const { reset } = memberSlice.actions
export default memberSlice.reducer
