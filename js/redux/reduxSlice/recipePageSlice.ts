import { createSlice } from '@reduxjs/toolkit'

export const recipePageSlice = createSlice({
    name: 'counter',
    initialState: {
        value: '',
    },
    reducers: {
        recipeToCurrentPage: (state, action) => {

            state.value = action.payload
        },

    },
})

export const { recipeToCurrentPage } = recipePageSlice.actions
const recipePageReducer = recipePageSlice.reducer
export default recipePageReducer