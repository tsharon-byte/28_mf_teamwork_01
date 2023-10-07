import { configureStore } from '@reduxjs/toolkit'
import bombermanSlice from './bomberman-slice'

const store = configureStore({
  reducer: {
    bomberman: bombermanSlice
  }
})

export default store
