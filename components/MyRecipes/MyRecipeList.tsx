import React, { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import formStyle from '../../styles/myRecipes.module.css'
import RecipeDetails from './RecipeDetails'
import { Typography } from '@mui/material';
import { colors } from '../MaterialUI/theme';
import { useDispatch, useSelector } from 'react-redux';
import { recipesReq } from '../../js/redux/reduxSlice/fetchSlice';
import { myRecipesList } from '../../js/MyRecipes/myRecipesList';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildSharpIcon from '@mui/icons-material/BuildSharp';
import recipePresentation from '../../js/recipePage/recipePresentation';
import { useRouter } from 'next/router';


const MyRecipeList = (prop) => {
    const email = useSelector((state) => state.user.value.email)
    const dispatch = useDispatch()
    const router = useRouter()


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

            {recipeReq.data.map(recipe =>
                <div key={Math.random()} className={formStyle.recipeCard} style={{ display: 'flex', flexDirection: 'column', alignItems: 'centers', width: '25%', flexWrap: 'wrap' }}>
                    <RecipeDetails recipe={recipe} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: '20px' }}>
                        <Button variant="outlined" startIcon={<DeleteIcon fontSize='small' />}
                            onClick={() => recipePresentation.buttonLinkToRecipePage(recipe, router, dispatch)}
                        >
                            Deletar
                        </Button>
                        <Button variant="outlined" startIcon={<BuildSharpIcon fontSize='small' />}
                            onClick={() => recipePresentation.buttonLinkToRecipePage(recipe, router, dispatch)}
                        >
                            Alterar
                        </Button>
                    </div>
                </div>
            )}
        </div >)
}

export default MyRecipeList;