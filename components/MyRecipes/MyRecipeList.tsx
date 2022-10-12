import RecipeDetails from './RecipeDetails'

import React from 'react';
import { HOCWithRecipeData } from './HOCWithRecipeData';

const MyRecipeList = ({ repoData }) => {

    if (repoData.loading) return <p>Carregando...</p>;

    return repoData.data.map(recipe => <RecipeDetails key={Math.random()} recipe={recipe} />);
}

export default HOCWithRecipeData(MyRecipeList);