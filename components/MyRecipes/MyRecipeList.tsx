import React, { useEffect } from 'react';
import { HOCWithRecipeData } from './HOCWithRecipeData';

import CircularProgress from '@mui/material/CircularProgress';
import formStyle from '../../styles/myRecipes.module.css'
import RecipeDetails from './RecipeDetails'
import { Typography } from '@mui/material';
import { colors } from '../MaterialUI/theme';
import { useDispatch, useSelector } from 'react-redux';
import { recipesReq } from '../../js/redux/reduxSlice/fetchSlice';
import { myRecipesList } from '../../js/MyRecipes/myRecipesList';

const MyRecipeList = (prop) => {
    const email = useSelector((state) => state.user.email)
    const dispatch = useDispatch()


    useEffect(() => {
        myRecipesList.recipeFromDB(email)
            .then(res => dispatch(recipesReq(res)))
    }, [])

    const recipeReq = useSelector((state) => state.fetch.recipesReq)

    if (recipeReq.loading) return (<div aria-label='carregando' style={{ textAlign: 'center' }}><CircularProgress sx={{ width: '30%', margin: '0 auto' }} /></div>)

    if (recipeReq.failed) return (
        <div style={{ textAlign: 'center' }}>
            <Typography sx={{ width: '30%', margin: '0 auto' }} variant="body1" component="p">
                Não existe receita ainda, tente mandar uma clicando na aba<Typography variant='body1' component='strong' color={colors.primary}> Enviar uma Receita</Typography>
            </Typography>
        </div>)

    return (
        <div className={formStyle.myRecipeList}>

            {recipeReq.data.map(recipe => <RecipeDetails key={Math.random()} recipe={recipe} />)}
        </div >)
}

export default MyRecipeList;