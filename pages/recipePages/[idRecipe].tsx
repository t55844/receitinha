import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import MoreDetailsRecipes from '../../components/RecipePage/MoreDetailsRecipes'

const SSR = typeof window === 'undefined'

export default (props) => {
    const recipeData = useSelector((state) => state.recipePage.value)

    const [recipe, setRecipe] = React.useState(null)

    useEffect(() => setRecipe(recipeData), [])


    if (recipe !== null) {
        return (
            <>
                <MoreDetailsRecipes recipe={recipe} />
            </>
        )
    }
}




/*
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '0 auto' }}>
            <Button sx={{ margin: '2%' }} variant='outlined' onClick={() => router.push('/generalPages/Form')}>retorne as receitas</Button>
        </div>
    )
*/