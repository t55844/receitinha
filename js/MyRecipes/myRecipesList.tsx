import RecipeDetails from "../../components/MyRecipes/RecipeDetails"
import { requestModel } from "../fetch/fecth"
import { email } from "../interface_and_ultils/interface"
import { getRecipes } from '../fetch/fecth'
import { tests } from "../interface_and_ultils/tests"
import { menssages } from "../interface_and_ultils/menssages"


export async function getImage(email: string): Promise<string> {

    const res = await requestModel(`http://localhost:3030/api/download/?id=${email}`, { method: 'GET' })
        .catch(error => menssages.emiteMensageError('Erro nao foi possivel pegar a imagem'))
    if (res != undefined) {
        const myBlob = await res.blob()
        const objectURL = URL.createObjectURL(myBlob)
        return objectURL
    }

}

async function recipeFromDB() {
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

function ingredientsList(recipe: object): string[] {
    let last = false
    let count = 1
    const ingredients = []
    while (last = true) {
        if (recipe[`ingredient${count}`]) {
            ingredients.push(recipe[`ingredient${count}`])
            count++
        } else {
            last = true
            break
        }
    }
    return ingredients
}

export const myRecipesList = {
    recipeFromDB,
    ingredientsList
}