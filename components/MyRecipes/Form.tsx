import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";
import formStyle from '../../styles/myRecipes.module.css'
import SendIcon from '@mui/icons-material/Send';
import { myRecipesForm } from "../../js/MyRecipes/myRecipesForm";
import SelectForm from "./SelectForm";
import { useSelector } from "react-redux";
import { IRecipeFromDB } from "../../js/interface_and_ultils/interface";
import IngredientListInput from "./IngredientListInput";
import InputAdornment from "@mui/material/InputAdornment";

const styleInput = {
    width: "80%",
    margin: '1.5rem auto'
}


export default function Form(props) {
    const recipe: IRecipeFromDB = props.recipe

    const user = useSelector((state) => state.user.value)

    const methods = useForm({ defaultValues: recipe })
    const { control, handleSubmit, getValues, setValue, reset } = methods

    const onSubmit = async (data) => {
        event.preventDefault()
        const check = myRecipesForm.verifyFields(
            [['name', 'nome'], ['ingredient1', 'ingrediente 1'], ['preparation', 'preparacao'], ['difficulty', 'dificuldade'], ['duration', 'duracao']],
            data)
        console.log(data)
        if (check) {

            const res = await myRecipesForm.submitRecipe({ ...data }, user.email)

            if (res && res.error === false) {
                reset()
            }
        }
    }


    return (
        < FormProvider {...methods} >

            <form aria-label='formulario envio de receita' onSubmit={handleSubmit(onSubmit)}>
                <div className={formStyle.formContainer}>
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
        </FormProvider>
    );
};