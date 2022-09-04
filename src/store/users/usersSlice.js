import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "../services/usersService";

export const getUsers = createAsyncThunk('USERS', async (_, thunkAPI) => {
  try {
    return await usersService.getUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response)
  }
})

const usersSlice = createSlice({
 
  name: 'users',
  initialState: {
    users: null,
    isError: false,
    isLoading: false,
    message: ''
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.users = null;
    });
  }
});

export default usersSlice.reducer;