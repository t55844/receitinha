import RecipeDetails from './RecipeDetails'

import React from 'react';
import { HOCWithRecipeData } from './HOCWithRecipeData';

const MyRecipeList = ({ repoData }) => {

    if (repoData.loading) return <p>Carregando...</p>;

    return (
        <div style={{ display: 'flex', justifyContent: "space-around", flexWrap: "wrap" }}>
            {repoData.data.map(recipe => <RecipeDetails key={Math.random()} recipe={recipe} name={recipe.name} />)}
        </div>)
}

export default HOCWithRecipeData(MyRecipeList);