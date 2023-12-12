import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import memberService from "./memberService";

const initialState = {
  members: [],
  member: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get admin members
export const getMembers = createAsyncThunk(
  "members/getAllMembers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await memberService.getMembers(token);
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

// Get an admin member
export const getMember = createAsyncThunk(
  "members/getMember",
  async (memberId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await memberService.getMember(memberId, token);
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

// Create New Member
export const createMember = createAsyncThunk(
  "members/createMember",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;

      return await memberService.createMember(data, token);
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

// Update member record
export const updateMember = createAsyncThunk(
  "members/updateMember",
  async ({ data, memberId }, thunkAPI) => {
    console.log(memberId);
    try {
      const token = thunkAPI.getState().auth.admin.token;

      return await memberService.updateMember(data, memberId, token);
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

// Delete member
export const deleteMember = createAsyncThunk(
  "events/deleteMember",
  async (memberId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;

      return await memberService.deleteMember(memberId, token);
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

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members = action.payload;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.member = action.payload;
      })
      .addCase(getMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members = [action.payload, ...state.members];
      })
      .addCase(createMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.member = action.payload;
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members.filter((member) => member._id !== action.payload._id);
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = memberSlice.actions;
export default memberSlice.reducer;
