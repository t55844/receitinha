import React from 'react'
import Typography from '@mui/material/Typography';

export default function Ingredients(props) {
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

