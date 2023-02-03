import React from 'react'
import { Typography } from '@mui/material';
import TimerSharpIcon from '@mui/icons-material/TimerSharp';
import IngredientList from './IngredientList';
import { colors } from '../MaterialUI/theme';
import { CldImage } from 'next-cloudinary';

function RecipePresentation(props) {
    const { recipe } = props

    return (
        <div style={{ width: '100%', margin: '2.5% auto', display: 'flex', flexDirection: 'column', alignItems: 'center', background: colors.opacity, borderBottom: `3px solid ${colors.primary}` }}>
            <Typography variant='h4' sx={{ margin: '4%', borderBottom: `3px solid ${colors.primary}` }}>
                {recipe.name}
            </Typography>

            <CldImage src={recipe.img} width='600px' height='400px' />

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '4%', borderBottom: `3px solid ${colors.primary}` }}>
                <Typography variant='h6' component='p'>{recipe.difficulty}</Typography>
                <Typography variant='h6' component='p'><TimerSharpIcon color='primary' /> {recipe.duration}</Typography>
            </div>

            <IngredientList ingredient={recipe.ingredients} />

            <div style={{ width: '80%', margin: '4% 0', borderBottom: `3px solid ${colors.primary}` }}>
                <Typography variant='h6'>Preparo</Typography>
                <Typography>{recipe.preparation}</Typography>
            </div>
        </div >
    )
}

export default (RecipePresentation)