import { useState } from "react"
import Snackbars from "../../components/feedback/Snackbar"
import Login from "../../components/User/Login"
import Register from "../../components/User/Register"

const RegisterLogin = props => {
    const [isRegister, setIsRegister] = useState<Boolean>(false)


    return (
        <>
            {
                isRegister ? <>
                    <Register outherOption={() => setIsRegister(false)} />
                </> : null

            }
            {
                !isRegister ? <>
                    <Login outherOption={() => setIsRegister(true)} />
                </> : null
            }
            <Snackbars />

        </>

    )
}

export default RegisterLogin