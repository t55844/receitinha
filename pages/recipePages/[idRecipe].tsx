import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Snackbars from '../../components/feedback/Snackbar'
import MoreDetailsRecipes from '../../components/RecipePage/MoreDetailsRecipes'


const idRecipe = (props) => {
    const recipeData = useSelector((state) => state.recipePage.value)

    const [recipe, setRecipe] = React.useState(null)

    useEffect(() => setRecipe(recipeData), [])


    if (recipe !== null) {
        return (
            <>
                <MoreDetailsRecipes recipe={recipe} />
                <Snackbars />
            </>
        )
    }
}


export default idRecipe
