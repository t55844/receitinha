import { createSlice } from '@reduxjs/toolkit'

export const recipePageSlice = createSlice({
    name: 'featch',
    initialState: {
        value: '',
    },
    reducers: {


    },
})

export const { recipeToCurrentPage } = recipePageSlice.actions
const recipePageReducer = recipePageSlice.reducer
export default recipePageReducer