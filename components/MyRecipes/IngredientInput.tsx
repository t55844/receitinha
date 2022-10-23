import React from 'react'
import { InputAdornment, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { myRecipesForm } from '../../js/MyRecipes/myRecipesForm';

export default function IngredientInput(props) {
    const { count, styleInput, deleteInput, inputIngredientContent, content } = props

    return (
        <div id={`ingredient${count}`} style={styleInput}>
            <TextField
                onBlur={(e) => inputIngredientContent(e.target.value)}
                sx={{ width: '90%' }}
                id="ingredient"
                label="Descreva o ingrediente"
                variant="outlined"
                InputProps={{
                    startAdornment: <InputAdornment position="start">{count + ' - '}</InputAdornment>,
                }}
            >{content}</TextField>
            <IconButton
                onClick={() => deleteInput(`ingredient${count}`)}
                aria-label="delete"
            >
                <DeleteIcon />
            </IconButton>
        </div>
    )
}