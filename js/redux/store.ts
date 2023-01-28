import { configureStore } from '@reduxjs/toolkit'
import fetchReducer from './reduxSlice/fetchSlice'
import recipeGerenReducer from './reduxSlice/recipeGeren'
import recipePageReducer from './reduxSlice/recipePageSlice'
import userReducer from './reduxSlice/userSlice'

export default configureStore({
    reducer: {
        recipePage: recipePageReducer,
        user: userReducer,
        fetch: fetchReducer,
        recipeGeren: recipeGerenReducer,

    },
})