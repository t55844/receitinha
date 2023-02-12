import { createContext, useEffect } from "react";
import { urlAuth } from "../js/fetch/fecth";
import { parseCookies } from 'nookies'
import { useDispatch } from "react-redux";
import { setUserData } from "../js/redux/reduxSlice/userSlice";

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

    const dispatch = useDispatch()


    useEffect(() => async () => {
        const { 'receitinha-token': token } = parseCookies()
        console.log('Aqui', token)

        if (token) {

            const result = fetch(urlAuth, {
                method: 'POST',
                body: JSON.stringify({ token }),
            })
                .then(resp => resp.json())
                .then(result => {
                    dispatch(setUserData({ name: result.payload.name, email: result.payload.email }))
                })




        }
    }, [])


    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )

}