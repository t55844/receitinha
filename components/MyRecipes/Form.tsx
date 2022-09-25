import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import formStyle from '../../styles/MyRecipes/form.module.css'
import SendIcon from '@mui/icons-material/Send';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import IconButton from '@mui/material/IconButton';
import { myRecipes } from "../../js/form/myRecipes";
import { save } from "../../js/fetch/feacth";
import { IFormInput } from "../../js/interface/form"


const styleInput = {
    width: "80%",
    margin: '1.5rem auto'
}

const onSubmit = (data) => {
    event.preventDefault()
    save(data)
}

export default (props) => {
    const { control, handleSubmit, getValues } = useForm();

    const [ingredientFields, setIngredientFields] = useState([<Controller
        key={1}
        name={`ingredient${1}`}
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
            <Typography
                variant="h5">
                Escreva sua receita
            </Typography>
            <div className={formStyle.formContainer}>

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
                        onClick={() => myRecipes.plusOne(setIngredientFields, ingredientFields, <Controller
                            key={- count}
                            name={`ingredient${count}`}
                            control={control}
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