import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import MoreDetailsRecipes from '../../components/RecipePage/MoreDetailsRecipes'


export default (props) => {
    const router = useRouter()
    const { idRecipe } = router.query
    const recipeData = useSelector((state) => state.recipePage.value)

    if (idRecipe !== undefined && recipeData !== '') {
        if (parseInt(idRecipe) === recipeData.id) {
            return (
                <>
                    <MoreDetailsRecipes recipe={recipeData} />
                </>
            )
        }

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '0 auto' }}>
            <Button sx={{ margin: '2%' }} variant='outlined' onClick={() => router.push('/generalPages/Form')}>retorne as receitas</Button>
        </div>
    )

}
