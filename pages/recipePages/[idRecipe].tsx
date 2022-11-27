import { Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MoreDetailsRecipes from '../../components/RecipePage/MoreDetailsRecipes'
import { IRecipeFromDB } from '../../js/interface_and_ultils/interface'


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
        <div style={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
            <Image src='/erro-404.jpg' width='300px' height='300px' />
            <Typography variant='h6'> Ouve um erro ao tentar encontrar uma informação, sentimos muito volte mais tarde</Typography>
        </div>
    )

}
