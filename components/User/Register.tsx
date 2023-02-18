import { useForm, Controller, SubmitHandler, FormProvider } from "react-hook-form";
import { IUserRegister } from "../../js/interface_and_ultils/interface";
import PasswordInput from "./PasswordInput";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { setCookie } from "nookies";
import { requestModel, urlRegister } from "../../js/fetch/fecth";
import { useDispatch } from "react-redux";
import { setUserData } from "../../js/redux/reduxSlice/userSlice";

import style from '../../styles/registerLogin.module.css'
import { TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";
import SendIcon from '@mui/icons-material/Send';
import WarningBoxText from "../feedback/WarningBoxText";
import TitleOfSection from "../Menu/TitleOfSection";
import { colors } from "../MaterialUI/theme";
import { useRouter } from "next/router";


const stylesInputs = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    border: `4px solid ${colors.primary}`,
    borderRadius: '6px'
}

const schema = yup.object({
    name: yup.string().trim().required('O campo nome é obrigatório'),

    email: yup.string().trim().required('O campo email é obrigatorio').email('Voce precisa de um email válido'),

    password: yup.string().trim()
        .matches(/\d+/, { message: { number: "Falta um numero" } })
        .matches(/[a-z]+/, { message: { lowercase: "Falta uma letra minuscula (a,b,c)" } })
        .matches(/[A-Z]+/, { message: { uppercase: "Falta uma letra maiuscula (A,B,C)" } })
        .matches(/[!@#$%^&*()-+]+/, {
            message: { special: "Falta um character especial (@,#,$)" }
        })
        .test(
            "Password has spaces",
            { spaces: "A senha nao pode ter espaços ou caracteres especiais" },
            value => !/\s+/.test(value)
        )
        .min(8, { size: "A senha precisa ter 8 digitos no minimo" })
        .required('O campo senha é obrigatório'),
    confirmPassword: yup
        .string()
        .required('O campo confirmação de senha é obrigatório')
        .oneOf([yup.ref("password"), null], "As senhas devem ser iguais")


})


const Register = () => {
    const dispatch = useDispatch();
    const router = useRouter();


    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            password: '',
            confirmPassword: '',
            email: ''
        }
    });
    const { reset, control, handleSubmit, formState: { errors }, getValues } = methods

    const onSubmit: SubmitHandler<IUserRegister> = async data => {
        console.log(data)
        delete data.confirmPassword
        const result = await fetch(urlRegister, { method: 'POST', body: JSON.stringify(data) })
            .then(res => res.json())
        if (result && result.error === false) {
            reset()
            dispatch(setUserData({ name: result.payload.name, email: result.payload.email }))
            router.push('/')
        }



    };
    return (
        <div className={style.formBox}>
            <FormProvider {...methods}>

                <form style={stylesInputs} onSubmit={handleSubmit(onSubmit)}>
                    <TitleOfSection text=' Registre-se' />

                    {errors.email ? <WarningBoxText text={errors.email.message} /> : null}
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <TextField {...field} id="outlined-basic-name" label="Email" variant="outlined" sx={{ m: 1, width: '28ch' }} />}
                    />

                    {errors.name ? <WarningBoxText text={errors.name.message} /> : null}
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => <TextField  {...field} id="outlined-basic-email" label="Nome" variant="outlined" sx={{ m: 1, width: '28ch' }} />}
                    />


                    {errors.password ? <WarningBoxText text={errors.password.message.size} /> : null}
                    {errors.password ? <WarningBoxText text={errors.password.message.number} /> : null}
                    {errors.password ? <WarningBoxText text={errors.password.message.lowercase} /> : null}
                    {errors.password ? <WarningBoxText text={errors.password.message.uppercase} /> : null}
                    {errors.password ? <WarningBoxText text={errors.password.message.special} /> : null}
                    <PasswordInput name='password' />

                    {errors.confirmPassword ? <WarningBoxText text={errors.confirmPassword.message} /> : null}

                    <PasswordInput name='confirmPassword' />

                    <Button
                        title="submit-button"
                        sx={{ margin: "1.5rem auto" }}
                        variant="contained"
                        endIcon={<SendIcon />}
                        type='submit'
                    >Enviar</Button>
                </form>
            </FormProvider >
        </div>
    );
};


export default Register