import React from 'react'
import { InputAdornment, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function IngredientInput(props) {
    const { count, styleInput, deleteInput, field } = props

    return (
        <div id={`ingredient${count}`} style={styleInput}>
            <TextField
                {...field}
                sx={{ width: '90%' }}
                id="ingredient"
                label="Descreva o ingrediente"
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start">{' - '}</InputAdornment>,
                }}
            ></TextField>
            <IconButton
                onClick={() => deleteInput(`ingredient${count}`)}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        </div>
    )
}