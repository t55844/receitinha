import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import { requestModel, urlRecipes } from '../../js/fetch/fecth';
import TitleOfSection from '../../components/Menu/TitleOfSection';
import { IResponse } from '../api/recipes';
import { IRecipeDB } from '../../js/interface_and_ultils/interface';
import RecipeDetails from '../../components/MyRecipes/RecipeDetails';


export async function getServerSideProps() {
    const res: IResponse = await requestModel(urlRecipes, { method: 'GET' })
        .then(res => res.json())
    const recipes: IRecipeDB[] = res.data
    const names: string[] = recipes.map(recipe => recipe.name)


    return {
        props: {
            names,
            recipes
        }
    }

}


export default function Sarch(props: { recipes: IRecipeDB[], names: string[] }) {

    const [nameRecipes, setNameRecipes] = React.useState<string[]>([]);
    const { names, recipes } = props
    const [currentRecipes, setCurrentRecipes] = React.useState<IRecipeDB[]>([]);


    React.useEffect(() => {
        setNameRecipes(names)

    }, [])

    return (
        <>

            <TitleOfSection text='Digite e busque por uma receita' />
            <Stack spacing={2} sx={{ width: 300, margin: '0 auto', width: '70%', height: '100%', padding: '1.2rem 0' }}>
                <Autocomplete
                    id="free-solo-demo"
                    onChange={(e, v) => setCurrentRecipes(v)}
                    options={nameRecipes.map((option) => option)}
                    freeSolo
                    multiple
                    renderInput={(params) => <TextField {...params} label="Pesquisar" />}
                />

            </Stack>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px', justifyContent: 'space-around' }}>
                {
                    recipes.filter(recipe => currentRecipes.includes(recipe.name))
                        .map(recipe => <RecipeDetails recipe={recipe} />)
                }
            </div>
        </>
    );
}