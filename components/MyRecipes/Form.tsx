import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import formStyle from '../../styles/myRecipes/myRecipes.module.css'
import SendIcon from '@mui/icons-material/Send';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import IconButton from '@mui/material/IconButton';
import { myRecipesForm } from "../../js/MyRecipes/myRecipesForm";
import SelectForm from "./SelectForm";
import IngredientInput from "./IngredientInput";


const styleInput = {
    width: "80%",
    margin: '1.5rem auto'
}
let countOutOfScope = 2


export default function Form(props) {
    const { control, handleSubmit, getValues, setValue, reset } = useForm();


    const onSubmit = (data) => {
        event.preventDefault()
        const check = myRecipesForm.verifyFields(
            ['name', 'ingredient1', 'preparation', 'difficulty', 'duration'],
            ['nome', 'ingrediente 1', 'preparacao', 'dificuldade', 'duracao'],
            data)
        if (check) {
            console.log(data)
            //myRecipesForm.submitRecipe({ ...data, email })
            reset()
        }
    }

    const [ingredientFields, setIngredientFields] = useState([<Controller
        key={1}
        name={`ingredient${1}`}
        defaultValue=""
        control={control}
        render={({ field }) => <TextField{...field}
            sx={styleInput}
            id="ingredient"
            label="Descreva o ingrediente"
            variant="outlined"
            InputProps={{
                startAdornment: <InputAdornment position="start">1 - </InputAdornment>,
            }} />}
    />])

    const count = ingredientFields.length + 1
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={formStyle.formContainer}>
                <Typography
                    variant="h5">
                    Escreva sua receita
                </Typography>

                <Controller
                    key={5}
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField{...field}
                        sx={styleInput}
                        id="name"
                        label="O nome da receita"
                        variant="outlined" />}
                />

                <div className={formStyle.ingredient}>
                    {ingredientFields}

                    <IconButton
                        sx={{ width: "2rem", margin: 'auto' }}
                        aria-label="PlusOne"
                        color="primary"
                        onClick={() => myRecipesForm.plusOne(setIngredientFields, ingredientFields, <Controller
                            key={- count}
                            name={`ingredient${count}`}
                            control={control}
                            defaultValue=""
                            render={({ field }) => <TextField{...field}
                                sx={styleInput}
                                id="ingredient"
                                label="Descreva o ingrediente"
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{count + ' - '}</InputAdornment>,
                                }} />}
                        />)}>
                        <PlusOneIcon />
                    </IconButton>
                </div>

                <Controller
                    key={4}
                    name="preparation"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField{...field}
                        sx={styleInput}
                        id="preparation"
                        label="Explique o modo de preparo"
                        variant="outlined"
                        multiline
                        rows={10} />}
                />

                <Controller
                    key={3}
                    name={"difficulty"}
                    control={control}
                    defaultValue=""
                    render={({ field }) => <SelectForm
                        name={'difficulty'}
                        selectOption={setValue}
                        sx={styleInput}
                        options={[
                            'Simples', 'Facil', "Dificil", "Muito Dificil"
                        ]}
                        label='Dificuldade'
                    />}
                />

                <Controller
                    key={2}
                    name="duration"
                    control={control}
                    defaultValue=''
                    render={({ field }) => <SelectForm
                        name={'duration'}
                        selectOption={setValue}
                        sx={styleInput}
                        options={[
                            '20 minutos', '30 minutos', "60 minutos", "Mais de 1:30 hora"
                        ]}
                        label='Tempo'
                    />}
                />
                <div style={styleInput}>
                    <Typography
                        variant="subtitle1"
                    >
                        Escolha uma imagem
                    </Typography>
                    <input
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
    );
};