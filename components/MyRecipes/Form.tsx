import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import formStyle from '../../styles/myRecipes/myRecipes.module.css'
import SendIcon from '@mui/icons-material/Send';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import IconButton from '@mui/material/IconButton';
import { myRecipesForm } from "../../js/MyRecipes/myRecipesForm";
import { email } from "../../js/interface_and_ultils/interface";


const styleInput = {
    width: "80%",
    margin: '1.5rem auto'
}

const onSubmit = (data) => {
    event.preventDefault()
    myRecipesForm.submitRecipe({ ...data, email })
}

export default function Form(props) {
    const { control, handleSubmit, getValues } = useForm();

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
                    name="difficulty"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <TextField{...field}
                        sx={styleInput}
                        id="difficulty"
                        label="Diga a dificuldade"
                        variant="outlined" />}
                />

                <Controller
                    key={2}
                    name="duration"
                    control={control}
                    defaultValue={0}
                    render={({ field }) => <TextField{...field}
                        sx={styleInput}
                        id='duration'
                        type="number"
                        label="Quanto tempo leva"
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">horas/minutos</InputAdornment>,
                        }} />}
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