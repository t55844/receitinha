import { useForm, Controller, SubmitHandler, FormProvider } from "react-hook-form";
import { IUserRegister } from "../../js/interface_and_ultils/interface";
import PasswordInput from "./PasswordInput";

import style from '../../styles/registerLogin.module.css'
import { Input, TextField } from "@mui/material";
import Button from "@mui/material/Button/Button";
import SendIcon from '@mui/icons-material/Send';
import TitleOfSection from "../Menu/TitleOfSection";
import { colors } from "../MaterialUI/theme";


const stylesInputs = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    border: `4px solid ${colors.primary}`,
    borderRadius: '6px'
}


const Login = () => {


    const methods = useForm({
        defaultValues: {
            name: '',
            password: '',
            confirmPassword: '',
            email: ''
        }
    });
    const { control, handleSubmit, formState: { errors }, getValues } = methods

    const onSubmit: SubmitHandler<IUserRegister> = data => {
        console.log(data)
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
        </div>
    );
};


export default Login