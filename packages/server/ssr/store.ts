import { configureStore } from '@reduxjs/toolkit'
import { forumSlice, userSlice } from 'client/src/store/slices'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    forum: forumSlice.reducer,
  },
})
