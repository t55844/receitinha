import { configureStore } from '@reduxjs/toolkit'
import recipePageReducer from './reduxSlice/recipePageSlice'

export default configureStore({
    reducer: {
        recipePage: recipePageReducer,
    },
})