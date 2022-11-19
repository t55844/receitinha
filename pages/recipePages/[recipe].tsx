import { useRouter } from 'next/router'
import React from 'react'
import MoreDetailsRecipes from '../../components/RecipePage/MoreDetailsRecipes'

export default (props) => {
    const router = useRouter()
    let { recipe } = router.query
    if (recipe !== undefined) {
        recipe = JSON.parse(recipe)
    }
    return (
        <>
            <MoreDetailsRecipes recipe={recipe} />
        </>
    )
}
