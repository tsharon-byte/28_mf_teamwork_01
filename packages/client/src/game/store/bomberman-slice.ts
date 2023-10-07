import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TPosition } from '../types'

export const bombermanSlice = createSlice({
    name: 'bomberman',
    initialState: {
        position: [1, 1]
    },
    reducers: {
        setPosition: (state, action: PayloadAction<TPosition>) => {
            state.position = action.payload
        }
    }
})

export const { setPosition } = bombermanSlice.actions

export default bombermanSlice.reducer
