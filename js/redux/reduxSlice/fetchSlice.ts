import { createSlice } from '@reduxjs/toolkit'


export const fetchSlice = createSlice({
    name: 'featch',
    initialState: {
        recipesReq: {
            loading: true,
            failed: false,
            data: []
        },
    },
    reducers: {
        recipesReq: (state, actions) => {
            if (actions.payload.length > 0) {
                state.recipesReq = {
                    loading: false,
                    failed: false,
                    data: actions.payload
                }
            } else {
                state.recipesReq = {
                    loading: false,
                    failed: true,
                    data: []
                }
            }
        }

    },
})

export const { recipesReq } = fetchSlice.actions
const fetchReducer = fetchSlice.reducer
export default fetchReducer