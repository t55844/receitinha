import React from 'react'
import { InputAdornment, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function IngredientInput(props) {
    const { id, styleInput, deleteInput, defaultValue, refItem } = props
    return (
        <div id={id} style={styleInput}>
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