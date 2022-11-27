import React from 'react';
import { HOCWithRecipeData } from './HOCWithRecipeData';

import CircularProgress from '@mui/material/CircularProgress';
import formStyle from '../../styles/myRecipes.module.css'
import RecipeDetails from './RecipeDetails'
import { Typography } from '@mui/material';
import { colors } from '../MaterialUI/theme';

const recipe = {
    name: 'bolo',
    difficulty: 'Facil',
    duration: '30 minutos',
    preparation: 'compra massa pre-pronta, pois e mais facil',
    ingredient: ['agua', 'leite', 'trigo', 'aveia', 'banana']
}

const MyRecipeList = ({ repoData }) => {

    if (repoData.loading) return (<div aria-label='carregando' style={{ textAlign: 'center' }}><CircularProgress sx={{ width: '30%', margin: '0 auto' }} /></div>)

    if (repoData.failed) return (
        <div style={{ textAlign: 'center' }}>
            <Typography sx={{ width: '30%', margin: '0 auto' }} variant="body1" component="p">
                Não existe receita ainda, tente mandar uma clicando na aba<Typography variant='body1' component='strong' color={colors.primary}> Enviar uma Receita</Typography>
            </Typography>
        </div>)

    return (
        <div className={formStyle.myRecipeList}>
            {/*<RecipeDetails key={Math.random()} recipe={recipe} />*/}
            {repoData.data.map(recipe => <RecipeDetails key={Math.random()} recipe={recipe} />)}
        </div >)
}

export default HOCWithRecipeData(MyRecipeList);