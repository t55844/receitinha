import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import TitleOfSection from '../../components/Menu/TitleOfSection';
import { IRecipeDB } from '../../js/interface_and_ultils/interface';
import RecipeDetails from '../../components/MyRecipes/RecipeDetails';
import { prisma } from '../../js/prisma/prismaDb';


export async function getServerSideProps() {

    const recipes: IRecipeDB[] = await prisma.Recipes.findMany({
        include: {
            comments: true,
            Likes: true
        }
    });
    const names: string[] = recipes.map(recipe => recipe.name)

    prisma.$disconnect();
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setNameRecipes(names)
        // eslint-disable-next-line react-hooks/exhaustive-deps

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
                        .map(recipe => <RecipeDetails key={recipe.id} recipe={recipe} />)
                }
            </div>
        </>
    );
}