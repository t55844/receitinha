import React from 'react'
import Typography from '@mui/material/Typography';

export default function Ingredients(props) {
    const recipe = props.recipe
    return (
        <div>
            {recipe.ingredient.map(ingredient => (
                <Typography key={Math.random()} paragraph>
                    {ingredient}
                </Typography>
            ))}

        </div>
    )
}

