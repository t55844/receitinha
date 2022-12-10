import { configureStore } from '@reduxjs/toolkit'
import recipePageReducer from './reduxSlice/recipePageSlice'
import userReducer from './reduxSlice/userSlice'

export default configureStore({
    reducer: {
        recipePage: recipePageReducer,
        user: userReducer,
    },
})