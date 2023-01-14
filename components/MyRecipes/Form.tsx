import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Button, Input, TextField, Typography } from "@mui/material";
import formStyle from '../../styles/myRecipes.module.css'
import SendIcon from '@mui/icons-material/Send';
import SelectForm from "./SelectForm";
import IngredientListInput from "./IngredientListInput";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { IRecipeFromDB } from "../../js/interface_and_ultils/interface";
import { useSelector } from "react-redux";
import { myRecipesForm } from "../../js/MyRecipes/myRecipesForm";


const styleInput = {
    width: "80%",
    margin: '1.5rem auto'
}

const schema = yup.object({
    name: yup.string().trim().required('Você precisa digitar o nome'),
    ingredients: yup.array().of(yup.object().shape({ ingredient: yup.string().trim().required('Voce precisda digitar no campo do ingredient'), id: yup.number() })).min(1, 'Voce precisda adicionar um ingredient'),
    preparation: yup.string().trim().required('Você precisa descrever a receita'),
    duration: yup.string().trim().required('Você precisa selecionar uma duração'),
    difficulty: yup.string().trim().required('Você precisa selecionar uma dificuldade'),
    img: yup.mixed()
        .required('precisa colocar uma foto aqui')
        .test('Existe Arquivo', 'Voce precisa adicionar um arquivo aqui', value => value.length > 0)
        .test('tamanho', 'O arquivo e muito grande', value => value && value.length > 0 && value[0].size <= 2000000)
}).required('precisa de uma foto ou imagem')

export default function Form(props) {

    const recipe: IRecipeFromDB = props.recipe

    const user = useSelector((state) => state.user.value)

    const methods = useForm({
        defaultValues: recipe,
        resolver: yupResolver(schema)
    });

    const { control, register, handleSubmit, getValues, setValue, reset, formState: { errors } } = methods

    const onSubmit = async data => {
        const res = await myRecipesForm.submitRecipe({ ...data }, user.email)

        if (res && res.error === false) {
            reset()

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

                    <Typography sx={{ color: 'red', fontSize: '16px' }} variant="body1">{errors.difficulty?.message}</Typography>
                    <Controller
                        key={3}
                        name={"difficulty"}
                        control={control}
                        defaultValue={''}
                        render={({ field }) => <SelectForm
                            name={'difficulty'}
                            option={getValues('difficulty')}
                            selectOption={setValue}
                            sx={styleInput}
                            options={[
                                'Selecione', 'Simples', 'Facil', "Dificil", "Muito Dificil"
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
                                'Selecione', '20 minutos', '30 minutos', "60 minutos", "Mais de 1:30 hora"
                            ]}
                            label='Duração'
                        />}
                    />

                    <Typography sx={{ color: 'red', fontSize: '16px' }} variant="body1">{errors.img?.message}</Typography>
                    <div style={styleInput}>
                        <Typography
                            variant="subtitle1"
                        >
                            Escolha uma imagem
                        </Typography>
                        <input
                            {...register('img')}
                            aria-label="entrada de imagem"
                            id="image_upload_input_recipes"
                            className={formStyle.uploadeImgButton}
                            style={styleInput}
                            type="file"
                            accept="image/png, image/jpg"
                        />
                    </div>

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

/* < FormProvider {...methods} >
<input type="submit" />
 
     <form aria-label='formulario envio de receita' onSubmit={handleSubmit(onSubmit)}>
         <div className={formStyle.formContainer}>
             <Controller
                 key={5}
                 name="name"
                 control={control}
                 rules={
                     {
                         required: {
                             value: true,
                             message: 'erro'
s                                 }
                     }
                 }
                 defaultValue=""
                 render={({ field }) => <TextField{...field}
                     placeholder='bolo de milho'
                     sx={styleInput}
                     id="name"
                     label="O nome da receita"
                     variant="standard" />}
             />
 
             <IngredientListInput
                 styleInput={styleInput} />
 
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
 
             <Controller
                 key={3}
                 name={"difficulty"}
                 control={control}
                 defaultValue={''}
                 render={({ field }) => <SelectForm
                     name={'difficulty'}
                     option={getValues('difficulty')}
                     selectOption={setValue}
                     sx={styleInput}
                     options={[
                         'Selecione', 'Simples', 'Facil', "Dificil", "Muito Dificil"
                     ]}
                     label='Dificuldade'
                 />}
             />
 
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
                         'Selecione', '20 minutos', '30 minutos', "60 minutos", "Mais de 1:30 hora"
                     ]}
                     label='Duração'
                 />}
             />
 
             <div style={styleInput}>
                 <Typography
                     variant="subtitle1"
                 >
                     Escolha uma imagem
                 </Typography>
                 <input
                     aria-label="entrada de imagem"
                     id="image_upload_input_recipes"
                     name='file'
                     className={formStyle.uploadeImgButton}
                     style={styleInput}
                     type="file"
                     accept="image/png, image/jpg"
                 />
 
 
             </div>
 
             <Button
                 title="submit-button"
                 sx={{ width: "40%", margin: "1.5rem auto" }}
                 variant="contained"
                 endIcon={<SendIcon />}
                 type='submit'
                 onClick={() => { onSubmit(getValues()) }}
             >Enviar</Button>
         </div>
 
     </form>
 </FormProvider>*/