

import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'user',
    initialState: {
        value: {
            name: '',
            email: '',
            id: ''
        },
        loginON: true
    },
    reducers: {
        setUserData: (state, action) => {
            const { name, email, id } = action.payload

            state.value.name = name
            state.value.email = email
            state.value.id = id
        },
        setloginState: (state, action) => {
            state.loginON = action.payload
        },

    },
})

export const { setUserData, setloginState } = user.actions
const userReducer = user.reducer
export default userReducer