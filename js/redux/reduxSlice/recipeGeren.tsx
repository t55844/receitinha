import { createSlice } from '@reduxjs/toolkit'

export const recipeGeren = createSlice({
    name: 'recipeGeren',
    initialState: {
        submitMethod: 'create'
    },
    reducers: {
        setSubmitMethod: (state, action) => {
            const method: 'create' | 'update' = action.payload
            state.submitMethod = method

        },

    },
})

export const { setSubmitMethod } = recipeGeren.actions
const recipeGerenReducer = recipeGeren.reducer
export default recipeGerenReducer