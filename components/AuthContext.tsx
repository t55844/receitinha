import { Context, createContext, useEffect, useState } from "react";
import { urlAuth } from "../js/fetch/fecth";
import { parseCookies } from 'nookies'
import { useDispatch } from "react-redux";
import { setUserData } from "../js/redux/reduxSlice/userSlice";
import { Dispatch } from "redux";
import { IResponse } from "../pages/api/recipes";

export const AuthContext: Context<{}> = createContext({})

export interface IAuthProviderProps {
    isLoggedIn: boolean
    token: string
}

export function AuthProvider({ children }) {

    const dispatch: Dispatch = useDispatch()
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [token, setToken] = useState<string>(null)


    useEffect(() => async () => {
        const { 'receitinha-token': token } = parseCookies()


        if (token) {
            setIsLoggedIn(true)
            setToken(token)
            const result: IResponse = fetch(urlAuth, {
                method: 'POST',
                body: JSON.stringify({ token }),
            })
                .then(resp => resp.json())
                .then(result => {
                    dispatch(setUserData(result.data))
                })

        } else {
            setIsLoggedIn(false)
        }
    }, [])


    return (
        <AuthContext.Provider value={{ isLoggedIn, token }}>
            {children}
        </AuthContext.Provider>
    )

}