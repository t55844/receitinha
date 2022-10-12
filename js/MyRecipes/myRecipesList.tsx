import RecipeDetails from "../../components/MyRecipes/RecipeDetails"
import { requestModel } from "../fetch/feacth"
import { email } from "../interface_and_ultils/form"
import { getRecipes } from '../fetch/feacth'


async function getImage(email: string) {

    const res = await requestModel(`http://localhost:3030/api/download/?id=${email}`, { method: 'GET' })
    const myBlob = await res.blob()
    const objectURL = URL.createObjectURL(myBlob)
    return objectURL
}

async function recipeFromDB() {
    const images = await getImage(email)
    const recipes = await getRecipes(email)
    return recipes
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