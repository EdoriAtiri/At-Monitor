import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eventService from "./eventService";

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

// update event register
export const updateEventRegister = createAsyncThunk(
  "events/updateEventRegister",
  async ({ data, eventId }, thunkAPI) => {
    console.log(data, eventId);
    try {
      const token = thunkAPI.getState().auth.admin.token;

      return await eventService.updateEventRegister(data, eventId, token);
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

export const resetEventState = createAsyncThunk("events/reset", async () => {
  return;
});

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    }, // resetSuccess: (state) => (state.isSuccess = false),
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
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getEvent.pending, (state) => {
        state.isLoading = true;
        state.myEvent = {};
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myEvent = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
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
        state.isSuccess = false;
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
        state.isSuccess = false;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myEvents.filter((event) => event._id !== action.payload._id);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateEventRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEventRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.myEvent.registered = [
          ...state.myEvent.registered,
          action.payload,
        ];
      })
      .addCase(updateEventRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetEventState.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      });
  },
});

export const { reset, resetSuccess } = eventSlice.actions;
export default eventSlice.reducer;
