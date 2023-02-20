import React from 'react'

import RecipeComments from './RecipeComments'
import RecipePresentation from './RecipePresentation'
import css from '../../styles/recipePage.module.css'
import { IRecipeDB } from '../../js/interface_and_ultils/interface'

function MoreDetailsRecipes(props: { recipe: IRecipeDB }) {
    const { recipe } = props
    return (
        <div className={css.recipePage} style={{ margin: '0 auto' }}>
            <RecipePresentation recipe={recipe} />
            <RecipeComments />
        </div>
    )
}

export default (MoreDetailsRecipes)