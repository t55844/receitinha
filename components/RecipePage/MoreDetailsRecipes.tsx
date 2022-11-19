import React from 'react'
import RecipeComments from './RecipeComments'
import RecipePresentation from './RecipePresentation'

function MoreDetailsRecipes(props) {
    const { recipe } = props
    return (
        <div style={{ margin: '0 2%' }}>
            <RecipePresentation recipe={recipe} />
            <RecipeComments />
        </div>
    )
}

export default (MoreDetailsRecipes)