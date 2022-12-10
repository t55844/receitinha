

import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'user',
    initialState: {
        name: 'Jon Silva',
        email: 'guto22@yahoo.com'
    },
    reducers: {
        setUserData: (state, action) => {
            const { name, email } = action.payload
            state.name = name
            state.email = email
        },

    },
})

export const { setUserData } = user.actions
const userReducer = user.reducer
export default userReducer