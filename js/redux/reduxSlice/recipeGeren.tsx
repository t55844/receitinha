import { createSlice } from '@reduxjs/toolkit'

export const sessionDB = typeof window !== "undefined" ? sessionStorage : { getItem: () => '', setItem: () => '', removeItem: () => '' }

export const recipeGeren = createSlice({
    name: 'recipeGeren',
    initialState: {
        submitMethod: sessionDB.getItem('submitMethod') && sessionDB.getItem('submitMethod').length > 0 ? sessionDB.getItem('submitMethod') : 'create'
    },
    reducers: {
        setSubmitMethod: (state, action) => {
            const method: 'create' | 'update' = action.payload
            sessionDB.setItem('submitMethod', method)
            state.submitMethod = method

        },

    },
})

export const { setSubmitMethod } = recipeGeren.actions
const recipeGerenReducer = recipeGeren.reducer
export default recipeGerenReducer