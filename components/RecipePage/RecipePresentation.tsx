import React from 'react'
import { Typography } from '@mui/material';
import Image from 'next/image';
import TimerSharpIcon from '@mui/icons-material/TimerSharp';
import IngredientList from './IngredientList';

function RecipePresentation(props) {
    const { recipe } = props

    return (
        <div style={{ width: '100%', margin: '2.5% auto', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#c8ffb1' }}>
            <Typography variant='h4' sx={{ margin: '4%' }}>
                {recipe.name}
            </Typography>

            <Image src={recipe.img} width={'600px'} height={'400px'}></Image>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '4%' }}>
                <Typography variant='h6' component='p'>{recipe.difficulty}</Typography>
                <Typography variant='h6' component='p'><TimerSharpIcon color='primary' /> {recipe.duration}</Typography>
            </div>

            <IngredientList ingredient={recipe.ingredient} />

            <div style={{ width: '80%', margin: '4% 0' }}>
                <Typography variant='h6'>Preparo</Typography>
                <Typography>{recipe.preparation}</Typography>
            </div>
        </div >
    )
}

export default (RecipePresentation)