import React from 'react';
import { HOCWithRecipeData } from './HOCWithRecipeData';

import CircularProgress from '@mui/material/CircularProgress';
import formStyle from '../../styles/myRecipes/myRecipes.module.css'
import RecipeDetails from './RecipeDetails'
import { Typography } from '@mui/material';
import { colors } from '../MaterialUI/theme';

const MyRecipeList = ({ repoData }) => {

    if (repoData.loading) return (<div style={{ textAlign: 'center' }}><CircularProgress sx={{ width: '30%', margin: '0 auto' }} /></div>)

    if (repoData.failed) return (
        <div style={{ textAlign: 'center' }}>
            <Typography sx={{ width: '30%', margin: '0 auto' }} variant="body1" component="p">
                Não existe receita ainda, tente mandar uma clicando na aba
                <Typography variant='body1' component='p' color={colors.primary}>
                    Enviar uma Receita
                </Typography>
            </Typography>
        </div>)

    return (
        <div className={formStyle.myRecipeList}>
            {repoData.data.map(recipe => <RecipeDetails key={Math.random()} recipe={recipe} name={recipe.name} />)}
        </div >)
}

export default HOCWithRecipeData(MyRecipeList);