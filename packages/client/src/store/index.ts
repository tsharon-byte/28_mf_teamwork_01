import { configureStore } from '@reduxjs/toolkit'
import { userSlice, forumSlice } from './slices'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    forum: forumSlice.reducer,
  },
})

export default store
