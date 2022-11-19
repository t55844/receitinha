import React from 'react'
import { Typography } from '@mui/material';
import Image from 'next/image';
import TimerSharpIcon from '@mui/icons-material/TimerSharp';

function RecipePresentation(props) {
    const { recipe } = props
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h4' sx={{ margin: '4%' }}>
                {recipe.name}
            </Typography>

            <Image src={`/imagem_para_testes.jpg`} width={'600px'} height={'400px'}></Image>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%', margin: '4%' }}>
                <Typography variant='h6' component='p'>{recipe.difficulty}</Typography>
                <Typography variant='h6' component='p'><TimerSharpIcon /> {recipe.duration}</Typography>
            </div>
        </div >

        //ingredientes

        //preparo
    )
}

export default (RecipePresentation)