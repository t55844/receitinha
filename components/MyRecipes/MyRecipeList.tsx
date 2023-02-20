import React, { useEffect } from 'react';

import { requestModel, urlRecipes } from '../../js/fetch/fecth';
import { menssages } from '../../js/interface_and_ultils/menssages';
import { NextRouter, useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { recipeToCurrentPage } from '../../js/redux/reduxSlice/recipePageSlice';

import formStyle from '../../styles/myRecipes.module.css'
import CircularProgress from '@mui/material/CircularProgress';
import RecipeDetails from './RecipeDetails'
import { Typography } from '@mui/material';
import { colors } from '../MaterialUI/theme';
import Button from '@mui/material/Button';
import BuildSharpIcon from '@mui/icons-material/BuildSharp';
import { setSubmitMethod } from '../../js/redux/reduxSlice/recipeGeren';
import QuestionModal from './QuestionModal';
import { Dispatch } from 'redux';
import { IResponse } from '../../pages/api/recipes';
import { IRecipeDB } from '../../js/interface_and_ultils/interface';

const MyRecipeList = (props) => {
    const email: string = useSelector((state) => state.user.value.email)
    const dispatch: Dispatch = useDispatch()
    const router: NextRouter = useRouter()

    const recipeReq: { loading: boolean, failed: boolean, data: IRecipeDB[] } = useSelector((state) => state.fetch.recipesReq)

    const deleteRecipe: Function = (id: number) => async () => {

        const res: IResponse = await requestModel(urlRecipes, { method: 'DELETE', body: JSON.stringify(id) })
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
                <div key={Math.random()} className={formStyle.recipeCard} style={{ display: 'flex', flexDirection: 'column', alignItems: 'centers', width: '25%', flexWrap: 'wrap', maxWidth: '300px' }}>
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
                                dispatch(recipeToCurrentPage(recipe));
                                router.push(`/editRecipe/${recipe.id}`)
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