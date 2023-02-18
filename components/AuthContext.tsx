import { createContext, useEffect, useState } from "react";
import { urlAuth } from "../js/fetch/fecth";
import { parseCookies } from 'nookies'
import { useDispatch } from "react-redux";
import { setUserData } from "../js/redux/reduxSlice/userSlice";

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

    const dispatch = useDispatch()
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => async () => {
        const { 'receitinha-token': token } = parseCookies()


        console.log('Aqui', token)
        if (token) {
            setIsLoggedIn(true)
            const result = fetch(urlAuth, {
                method: 'POST',
                body: JSON.stringify({ token }),
            })
                .then(resp => resp.json())
                .then(result => {
                    dispatch(setUserData({ name: result.payload.name, email: result.payload.email }))
                })

        } else {
            setIsLoggedIn(false)
        }
    }, [])


    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )

}