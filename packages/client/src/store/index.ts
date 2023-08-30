import { configureStore } from '@reduxjs/toolkit'
import { userSlice, forumSlice } from './slices'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    forum: forumSlice.reducer,
  },
  preloadedState: window.__PRELOADED_STATE__,
})

delete window.__PRELOADED_STATE__
export default store
