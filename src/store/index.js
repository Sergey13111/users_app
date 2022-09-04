import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./users/usersSlice";
import postsSlice from "./posts/postsSlice";
import albumsSlice from "./albums/albumsSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    albums: albumsSlice
  }
})

