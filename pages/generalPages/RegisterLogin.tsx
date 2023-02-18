import Button from "@mui/material/Button"
import { useState } from "react"
import Snackbars from "../../components/feedback/Snackbar"
import Login from "../../components/User/Login"
import Register from "../../components/User/Register"


export default props => {
    const [isRegister, setIsRegister] = useState<Boolean>(false)


    return (
        <>
            {
                isRegister ? <>
                    <Register />
                    <Button size="small" onClick={() => setIsRegister(true)}>Entrar</Button>
                </> : null

            }
            {
                !isRegister ? <>
                    <Login />
                    <Button size="small" onClick={() => setIsRegister(false)}>Registar</Button>
                </> : null
            }
            <Snackbars />

        </>

    )
}