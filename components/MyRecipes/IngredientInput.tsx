import React from 'react'
import { InputAdornment, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from 'react-hook-form';
import Typography from '@mui/material/Typography';

export default function IngredientInput(props) {
    const { formState: { errors } } = useFormContext()

    const { id, styleInput, deleteInput, defaultValue, refItem, index } = props
    return (
        <div id={id} style={styleInput}>
            <Typography sx={{ color: 'red', fontSize: '16px' }} variant="body1">{errors.ingredients && errors.ingredients[index] != undefined ? errors.ingredients[index].ingredient.message : ''}</Typography>

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