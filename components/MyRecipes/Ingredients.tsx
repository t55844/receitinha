import React from 'react'
import Typography from '@mui/material/Typography';
import { IRecipeDB } from '../../js/interface_and_ultils/interface';

export default function Ingredients(props: { recipe: IRecipeDB }) {
    const recipe = props.recipe
    return (
        <div>
            {recipe.ingredients.map(item => (
                <Typography key={Math.random()} paragraph>
                    {item.ingredient}
                </Typography>
            ))}

        </div>
    )
}

