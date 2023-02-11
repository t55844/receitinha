

import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'user',
    initialState: {
        value: {
            name: 'Jon Silva',
            email: 'guto22@yahoo.com'
        },
        loginON: true
    },
    reducers: {
        setUserData: (state, action) => {
            const { name, email } = action.payload
            state.value.name = name
            state.value.email = email
        },
        setloginState: (state, action) => {
            state.loginON = action.payload
        },

    },
})

export const { setUserData, setloginState } = user.actions
const userReducer = user.reducer
export default userReducer