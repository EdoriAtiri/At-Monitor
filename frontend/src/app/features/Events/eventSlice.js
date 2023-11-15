import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "./EventService";

const initialState = {
  myEvents: [],
  myEvent: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get admin events
export const getEvents = createAsyncThunk(
  "events/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await eventService.getEvents(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Get an admin event
export const getEvent = createAsyncThunk(
  "events/getEvent",
  async (eventId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await eventService.getEvent(eventId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Create an event
export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;

      return await eventService.createEvent(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  },
);
// Edit an event
export const editEvent = createAsyncThunk(
  "events/editEvent",
  async ({ data, eventId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;

      return await eventService.editEvent(data, eventId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Delete an event
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;

      return await eventService.deleteEvent(eventId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    reset: (state) => initialState,
    // resetSuccess: (state) => (state.isSuccess = false),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myEvents = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myEvent = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myEvents = [action.payload, ...state.myEvents];
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myEvent = action.payload;
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myEvent.filter((event) => event._id !== action.payload._id);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetSuccess } = eventSlice.actions;
export default eventSlice.reducer;
