import React from 'react'
import { myRecipesList } from '../../js/MyRecipes/myRecipesList'
import Typography from '@mui/material/Typography';

export default function Ingredients(props) {
    const recipe = props.recipe
    return (
        <div>
            {myRecipesList.ingredientsList(recipe)
                .map(ingrdient => (
                    <Typography key={Math.random()} paragraph>
                        {ingrdient}
                    </Typography>
                ))}

        </div>
    )
}

