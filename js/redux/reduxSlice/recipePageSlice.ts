import { createSlice } from '@reduxjs/toolkit'


let recipeFromSession

if (typeof window !== 'undefined') {
    const recipe = JSON.parse(sessionStorage.getItem('recipePage'))
    recipeFromSession = recipe
} else {
    recipeFromSession = ''
}


export const recipePageSlice = createSlice({
    name: 'counter',
    initialState: {
        value: recipeFromSession,
    },
    reducers: {
        recipeToCurrentPage: (state, action) => {
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('recipePage', JSON.stringify(action.payload))
                recipeFromSession = JSON.parse(sessionStorage.getItem('recipePage'))
                state.value = recipeFromSession
            }
        },

    },
})

export const { recipeToCurrentPage } = recipePageSlice.actions
const recipePageReducer = recipePageSlice.reducer
export default recipePageReducer