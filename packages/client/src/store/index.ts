import { configureStore } from '@reduxjs/toolkit'
import { userSlice, forumSlice, leaderboardSlice } from './slices'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    forum: forumSlice.reducer,
    leaderboard: leaderboardSlice.reducer,
  },
})

export default store
