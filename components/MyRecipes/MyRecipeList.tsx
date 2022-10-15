import React from 'react';
import { HOCWithRecipeData } from './HOCWithRecipeData';

import formStyle from '../../styles/myRecipes/myRecipes.module.css'
import RecipeDetails from './RecipeDetails'

const MyRecipeList = ({ repoData }) => {

    if (repoData.loading) return <p>Carregando...</p>;

    return (
        <div className={formStyle.myRecipeList}>
            {repoData.data.map(recipe => <RecipeDetails key={Math.random()} recipe={recipe} name={recipe.name} />)}
        </div >)
}

export default HOCWithRecipeData(MyRecipeList);