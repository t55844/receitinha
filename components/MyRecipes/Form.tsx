import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import formStyle from '../../styles/myRecipes.module.css'
import SendIcon from '@mui/icons-material/Send';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import IconButton from '@mui/material/IconButton';
import { joinInredients, myRecipesForm } from "../../js/MyRecipes/myRecipesForm";
import SelectForm from "./SelectForm";
import IngredientInput from "./IngredientInput";
import { useSelector } from "react-redux";

const styleInput = {
    width: "80%",
    margin: '1.5rem auto'
}
let countOutOfScope = 2


export default function Form(props) {
    const { control, handleSubmit, getValues, setValue, reset } = useForm();
    const user = useSelector((state) => state.user.value)

    const onSubmit = (data) => {
        event.preventDefault()
        const check = myRecipesForm.verifyFields(
            ['name', 'ingredient1', 'preparation', 'difficulty', 'duration'],
            ['nome', 'ingrediente 1', 'preparacao', 'dificuldade', 'duracao'],
            data)
        if (check) {
            myRecipesForm.submitRecipe({ ...data }, user.email)
            reset()
        }
    }

    const [ingredientFields, setIngredientFields] = useState([<Controller
        key={`ingredient${1}`}
        name={`ingredient${1}`}
        aria-label='ingredient input'
        defaultValue=""
        control={control}
        render={({ field }) => <TextField{...field}
            placeholder='Ingrediente'
            sx={styleInput}
            id="ingredient"
            label="Descreva o ingrediente"
            variant="standard"
            InputProps={{
                startAdornment: <InputAdornment position="start"> - </InputAdornment>,
            }} />}
    />])

    const [inputToDelete, setInputToDelete] = useState<string>()

    useEffect(() => myRecipesForm.deleteInput(setIngredientFields, ingredientFields, inputToDelete), [inputToDelete])



    const count = countOutOfScope
    return (

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

                <div className={formStyle.ingredient}>
                    {ingredientFields}

                    <IconButton
                        sx={{ width: "2rem", margin: 'auto' }}
                        aria-label="plusOne"
                        color="primary"
                        onClick={() => {
                            countOutOfScope++
                            myRecipesForm.plusOne(setIngredientFields, ingredientFields, <Controller
                                key={`ingredient${count}`}
                                name={`ingredient${count}`}
                                control={control}
                                defaultValue=""
                                render={({ field }) => <IngredientInput
                                    count={count}
                                    deleteInput={() =>
                                        setInputToDelete(`ingredient${count}`)}
                                    field={field}
                                    styleInput={styleInput}
                                />}
                            />)
                        }}>
                        <PlusOneIcon />
                    </IconButton>
                </div>

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
    );
};