import { configureStore } from '@reduxjs/toolkit'
import { commentsSlice, forumSlice, userSlice } from 'client/src/store/slices'
import emojiSlice from 'client/src/store/slices/emoji-slice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    forum: forumSlice.reducer,
    comments: commentsSlice.reducer,
    emojies: emojiSlice.reducer,
  },
})
