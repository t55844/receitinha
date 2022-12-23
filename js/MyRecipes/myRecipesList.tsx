import { requestModel } from "../fetch/fecth"
import { getRecipes } from '../fetch/fecth'
import { tests } from "../interface_and_ultils/tests"
import { menssages } from "../interface_and_ultils/menssages"
import { IRecipeFromDB } from "../interface_and_ultils/interface"


export async function getImage(email: string): Promise<string> {

    const res = await requestModel(`http://localhost:3030/api/download/?id=${email}`, { method: 'GET' })
        .catch(error => menssages.emiteMensageError('Erro nao foi possivel pegar a imagem'))
    if (res != undefined) {
        const myBlob = await res.blob()
        const objectURL = URL.createObjectURL(myBlob)
        return objectURL
    }

}

async function recipeFromDB(email: string) {
    const images = await getImage(email)
    const recipes = await getRecipes(email)
    const recipesCheck = tests.testArrayLength(recipes)
    if (recipesCheck.error === false) {
        recipes.forEach(recipe => recipe['img'] = `${images}`)
        return recipes
    } else {
        return []
    }

}

async function deleteRecipe(id: number, email: string) {
    const res = await requestModel(`http://localhost:3030/api/download/?id=${email}`, { method: 'DELETE' })
    if (res) {
        menssages.emiteMensageSuccess('Receita deletada com succeso')
    }
}

async function updateRecipe(recipe: IRecipeFromDB, email: string) {
    const res = await requestModel(`http://localhost:3030/api/download/?id=${email}`, { method: 'PATCH', headers: { 'Content-Type': ' application/json' }, body: JSON.stringify(recipe) })
    if (res) {
        menssages.emiteMensageSuccess('Receita deletada com succeso')
    }
}

export const myRecipesList = {
    recipeFromDB,
    deleteRecipe,
    updateRecipe
}