import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { toBase64 } from "../../js/interface_and_ultils/converters";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/router";
import { menssages } from "../../js/interface_and_ultils/menssages";
import { useDispatch, useSelector } from "react-redux";
import { requestModel, urlRecipes } from "../../js/fetch/fecth";
import { recipesReq } from "../../js/redux/reduxSlice/fetchSlice";

import formStyle from '../../styles/myRecipes.module.css'
import { Button, Input, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import SelectForm from "./SelectForm";
import IngredientListInput from "./IngredientListInput";
import { IRecipeFromDB } from "../../js/interface_and_ultils/interface";
import ImageInput from "./ImageInput";


const styleInput = {
    width: "80%",
    margin: '1.5rem auto'
}

const schema = yup.object({
    name: yup.string().trim().required('Você precisa digitar o nome'),
    ingredients: yup.array().of(yup.object().shape({ ingredient: yup.string().trim().required('Voce precisda digitar no campo do ingredient'), id: yup.number() })).min(1, 'Voce precisda adicionar um ingredient'),
    preparation: yup.string().trim().required('Você precisa descrever a receita'),
    duration: yup.string().trim().required('Você precisa selecionar uma duração'),
    diffculty: yup.string().trim().required('Você precisa selecionar uma dificuldade'),
    img: yup.mixed()
        .required('precisa colocar uma foto aqui')
        .test('Existe Arquivo', 'Voce precisa adicionar um arquivo aqui', value => value.length > 0)
        .test('tamanho', 'O arquivo e muito grande', value => value && value.length > 0 && value[0].size <= 2000000)
}).required('precisa de uma foto ou imagem')


export default function Form(props) {

    const recipe: IRecipeFromDB = props.recipe

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)
    const submitMethod = useSelector((state) => state.recipeGeren.submitMethod)
    const router = useRouter()
    const methods = useForm({
        defaultValues: recipe,
        resolver: yupResolver(schema)
    });

    const { control, handleSubmit, getValues, setValue, reset, formState: { errors } } = methods

    const onSubmit = async data => {
        const base64 = await toBase64(data.img[0])
        data.img = base64

        let res

        if (submitMethod === 'create') res = await requestModel(urlRecipes, { method: 'POST', body: JSON.stringify({ ...data, email: user.email }) })
            .then(res => res.json())

        if (submitMethod === 'update') res = await requestModel(urlRecipes, { method: 'PUT', body: JSON.stringify({ ...data, email: user.email }) })
            .then(res => res.json())

        if (res && res.error === false) {
            reset()
            menssages.emiteMensageSuccess('Receita envida e Salva com successo')
            dispatch(recipesReq(res));
        } else {
            menssages.emiteMensageError('Ouve um erro e não foi possivel salvar a receita')
        }
    };

    return (
        < FormProvider {...methods} >
            <form aria-label='formulario envio de receita' onSubmit={handleSubmit(onSubmit)}>
                <div className={formStyle.formContainer}>

                    <Typography sx={{ color: 'red', fontSize: '16px' }} variant="body1">{errors.name?.message}</Typography>
                    <Controller
                        key={5}
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField{...field}
                            placeholder='bolo de milho'
                            sx={styleInput}
                            id="name"
                            label="O nome da receita"
                            variant="standard" />}
                    />

                    <Typography sx={{ color: 'red', fontSize: '16px' }} variant="body1">{errors.ingredients?.message}</Typography>
                    <IngredientListInput
                        styleInput={styleInput} />

                    <Typography sx={{ color: 'red', fontSize: '16px' }} variant="body1">{errors.preparation?.message}</Typography>
                    <Controller
                        key={4}
                        name="preparation"
                        control={control}
                        defaultValue=""
                        render={({ field }) => <TextField{...field}
                            placeholder='coloque a massa na batedeira, misture com leite e a manteiga ate que fique homogenea'
                            sx={styleInput}
                            id="preparation"
                            label="Explique o modo de preparo"
                            variant="standard"
                            multiline
                            rows={10} />}
                    />

                    <Typography sx={{ color: 'red', fontSize: '16px' }} variant="body1">{errors.diffculty?.message}</Typography>
                    <Controller
                        key={3}
                        name={"diffculty"}
                        control={control}
                        defaultValue={''}
                        render={({ field }) => <SelectForm
                            name={'diffculty'}
                            option={getValues('diffculty')}
                            selectOption={setValue}
                            sx={styleInput}
                            options={[
                                'Simples', 'Facil', "Dificil", "Muito Dificil"
                            ]}
                            label='Dificuldade'
                        />}
                    />

                    <Typography sx={{ color: 'red', fontSize: '16px' }} variant="body1">{errors.duration?.message}</Typography>
                    <Controller
                        key={2}
                        name={"duration"}
                        control={control}
                        defaultValue={''}
                        render={({ field }) => <SelectForm
                            name={'duration'}
                            option={getValues('duration')}
                            selectOption={setValue}
                            sx={styleInput}
                            options={[
                                '20 minutos', '30 minutos', "60 minutos", "Mais de 1:30 hora"
                            ]}
                            label='Duração'
                        />}
                    />

                    <Typography sx={{ color: 'red', fontSize: '16px' }} variant="body1">{errors.img?.message}</Typography>
                    <ImageInput styleInput={styleInput} />

                    <Button
                        title="submit-button"
                        sx={{ width: "40%", margin: "1.5rem auto" }}
                        variant="contained"
                        endIcon={<SendIcon />}
                        type='submit'
                    >Enviar</Button>
                </div>
            </form>
        </FormProvider >
    )
}