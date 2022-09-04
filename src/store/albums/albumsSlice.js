import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "../services/usersService";

export const getAlbums = createAsyncThunk('ALBUMS', async (id, thunkAPI) => {
  try {
    return await usersService.getAlbums(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response)
  }
});

const albumsSlice = createSlice({
  name: 'albums',
  initialState: {
    albums: null,
    isError: false,
    isLoading: false,
    message:'',
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbums.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAlbums.fulfilled, (state, action) => {
      state.isLoading = false;
      state.albums = action.payload;
    });
    builder.addCase(getAlbums.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
      state.albums = null;
    });
  }
});

export default albumsSlice.reducer;