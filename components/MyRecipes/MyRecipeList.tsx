import React, { useEffect } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import formStyle from '../../styles/myRecipes.module.css'
import RecipeDetails from './RecipeDetails'
import { Typography } from '@mui/material';
import { colors } from '../MaterialUI/theme';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import BuildSharpIcon from '@mui/icons-material/BuildSharp';
import recipePresentation from '../../js/recipePage/recipePresentation';
import { useRouter } from 'next/router';
import { setSubmitMethod } from '../../js/redux/reduxSlice/recipeGeren';
import QuestionModal from './QuestionModal';
import { requestModel } from '../../js/fetch/fecth';
import { menssages } from '../../js/interface_and_ultils/menssages';


const MyRecipeList = (props) => {
    const email = useSelector((state) => state.user.value.email)
    const dispatch = useDispatch()
    const router = useRouter()

    const recipeReq = useSelector((state) => state.fetch.recipesReq)

    const deleteRecipe = (id) => async () => {

        const res = await requestModel('http://localhost:3000/api/recipes', { method: 'DELETE', body: JSON.stringify(id) })
            .then(res => res.json())

        if (res.error == false) {
            menssages.emiteMensageSuccess('Receita deletada com sucesso!')
            router.reload()

        } else {
            menssages.emiteMensageError('Não foi possivel deletar a receita.')
        }
    }


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
                        <QuestionModal
                            buttonName='Deletar'
                            question='Voçê realmente deseja deletar essa receita ? depos não avera volta.'
                            agree='Sim'
                            denied='Não'
                            title='Deletar a receita'
                            agreeAction={deleteRecipe(recipe.id)}
                        />
                        <Button variant="outlined" startIcon={<BuildSharpIcon fontSize='small' />}
                            onClick={() => {
                                dispatch(setSubmitMethod('update'));
                                recipePresentation.buttonLinkToPage('/editRecipe/', recipe, router, dispatch)
                            }}
                        >
                            Alterar
                        </Button>
                    </div>
                </div>
            )}
        </div >)
}

export default MyRecipeList;