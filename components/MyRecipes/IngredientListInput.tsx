import React from 'react'
import { useFieldArray, useFormContext } from "react-hook-form";

import PlusOneIcon from '@mui/icons-material/PlusOne';
import IconButton from '@mui/material/IconButton';
import formStyle from '../../styles/myRecipes.module.css'
import IngredientInput from "./IngredientInput";
import Typography from '@mui/material/Typography';
import { ICssInputForm } from './Form';
import { FieldValues } from 'react-hook-form/dist/types';




const IngredientListInput = (props: { styleInput: ICssInputForm }) => {
    const { styleInput } = props

    const { control, register, formState: { errors } } = useFormContext<FieldValues>()
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<FieldValues, "ingredients", "id">({
        rules: {
            required: true,
        },
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "ingredients", // unique name for your Field Array
    });

    return (

        <div className={formStyle.ingredient}>
            <Typography sx={{ margin: '0 auto' }} variant='h6'>Adicione um ingredient</Typography>
            {fields.map((field: { id: string, ingredient: string }, index: number) => (


                <IngredientInput
                    key={field.id}
                    id={field.id}
                    index={index}
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
                onClick={() => append({ ingredient: '' })}>
                <PlusOneIcon />
            </IconButton>
        </div>
    )

}

export default IngredientListInput
