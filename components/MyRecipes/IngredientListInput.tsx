import React, { Component, useEffect, useState } from 'react'
import PlusOneIcon from '@mui/icons-material/PlusOne';
import IconButton from '@mui/material/IconButton';
import { myRecipesForm } from "../../js/MyRecipes/myRecipesForm";
import formStyle from '../../styles/myRecipes.module.css'
import IngredientInput from "./IngredientInput";
import { useFieldArray, useFormContext } from "react-hook-form";
import Typography from '@mui/material/Typography';




const IngredientListInput = (props) => {
    const { styleInput } = props

    const { control, register, reset } = useFormContext()
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "ingredients", // unique name for your Field Array
    });


    return (

        <div className={formStyle.ingredient}>
            <Typography sx={{ margin: '0 auto' }} variant='h6'>Adicione um ingredient</Typography>
            {fields.map((field, index) => (

                <IngredientInput
                    key={field.id}
                    id={field.id}
                    deleteInput={() => remove(index)}
                    styleInput={styleInput}
                    defaultValue={field.ingredient || ''}
                    refItem={{ ...register(`ingredients.${index}.ingredient`) }}
                />
            ))}
            <IconButton
                sx={{ width: "2rem", margin: 'auto' }}
                aria-label="plusOne"
                color="primary"
                onClick={() => append({})}>
                <PlusOneIcon />
            </IconButton>
        </div>
    )

}

export default IngredientListInput
