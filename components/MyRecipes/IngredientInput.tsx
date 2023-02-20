import React from 'react'
import { useFormContext } from 'react-hook-form';

import { InputAdornment, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningBoxText from '../feedback/WarningBoxText';
import { ICssInputForm } from './Form';
import { ChangeHandler, FieldValues, RefCallBack } from 'react-hook-form/dist/types';

interface refItem {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    ref: RefCallBack;
    name: `ingredients.${number}.ingredient`;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
}
interface IIngredientInputProps {
    id: string
    styleInput: ICssInputForm
    deleteInput: Function
    defaultValue: string
    refItem: refItem
    index: number
}

export default function IngredientInput(props: IIngredientInputProps) {

    const { formState: { errors } } = useFormContext<FieldValues>()
    const { id, styleInput, deleteInput, defaultValue, refItem, index } = props
    return (
        <div id={id} style={styleInput}>
            {errors.ingredients && errors.ingredients[index] != undefined ? <WarningBoxText text={errors.ingredients[index].ingredient.message} /> : null}

            <TextField
                {...refItem}
                defaultValue={defaultValue}
                placeholder='Ingrediente'
                sx={{ width: '90%' }}
                id={id}
                label="Descreva o ingrediente"
                variant="standard"
                InputProps={{
                    startAdornment: <InputAdornment position="start">{' - '}</InputAdornment>,
                }}
            ></TextField>
            <IconButton
                onClick={() => deleteInput()}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        </div >
    )
}