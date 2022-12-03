import React from 'react'
import RecipeComments from './RecipeSugest'
import RecipePresentation from './RecipePresentation'
import css from '../../styles/recipePage.module.css'

function MoreDetailsRecipes(props) {
    const { recipe } = props
    return (
        <div className={css.recipePage} style={{ margin: '0 auto' }}>
            <RecipePresentation recipe={recipe} />
            <RecipeComments />
        </div>
    )
}

export default (MoreDetailsRecipes)