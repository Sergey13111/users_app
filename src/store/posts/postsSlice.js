import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "../services/usersService";

export const getPosts = createAsyncThunk('POSTS', async (id, thunkAPI) => {
  try {
    return await usersService.getPosts(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response)
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: null,
    isError: false,
    isLoading: false,
    message:'',
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.posts = null;
    });
  }
});

export default postsSlice.reducer;