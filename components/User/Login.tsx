import { useForm, Controller, SubmitHandler, FormProvider } from "react-hook-form";
import { IUserLogin } from "../../js/interface_and_ultils/interface";
import PasswordInput from "./PasswordInput";
import { urlLogin } from "../../js/fetch/fecth";
import { useDispatch } from "react-redux";
import { setUserData } from "../../js/redux/reduxSlice/userSlice";
import { NextRouter, useRouter } from "next/router";

import style from '../../styles/registerLogin.module.css'
import { TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";
import SendIcon from '@mui/icons-material/Send';
import TitleOfSection from "../Menu/TitleOfSection";
import { colors } from "../MaterialUI/theme";
import { menssages } from "../../js/interface_and_ultils/menssages";
import { Dispatch } from "redux";
import { UseFormReturn } from "react-hook-form/dist/types";
import { IResponse } from "../../pages/api/recipes";
import { SetStateAction } from "react";


const stylesInputs = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    border: `4px solid ${colors.primary}`,
    borderRadius: '6px'
}


const Login = (props: { outherOption: SetStateAction<Boolean> }) => {

    const outherOption = props.outherOption
    const router: NextRouter = useRouter();
    const dispatch: Dispatch = useDispatch()

    const methods: UseFormReturn<{
        password: string;
        email: string;
    }, any> = useForm({
        defaultValues: {
            password: '',
            email: ''
        }
    });
    const { reset, control, handleSubmit, formState: { errors }, getValues } = methods

    const onSubmit: SubmitHandler<IUserLogin> = async data => {
        const result: IResponse = await fetch(urlLogin, { method: 'POST', body: JSON.stringify(data) })
            .then(res => res.json())
        if (result.error === false) {
            reset()
            dispatch(setUserData(result.data))
            router.reload()

        } else {
            menssages.emiteMensageError('Não foi possivel entrar email ou senha estão errados')

        }
    };
    return (
        <div className={style.formBox}>
            <FormProvider {...methods}>

                <form style={stylesInputs} onSubmit={handleSubmit(onSubmit)}>
                    <TitleOfSection text=' Entrar' />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <TextField {...field} id="outlined-basic-name" label="Email" variant="outlined" sx={{ m: 1, width: '28ch' }} />}
                    />
                    <PasswordInput name='password' />

                    <Button
                        title="submit-button"
                        sx={{ margin: "1.5rem auto" }}
                        variant="contained"
                        endIcon={<SendIcon />}
                        type='submit'
                    >Enviar</Button>
                </form>
            </FormProvider >
            <Button size="small" onClick={() => outherOption()}>Registar</Button>

        </div>
    );
};


export default Login