import { IRecipeFromDB } from "../interface_and_ultils/interface"
import { recipeToCurrentPage } from "../redux/reduxSlice/recipePageSlice"


function buttonLinkToRecipePage(recipe: IRecipeFromDB, router, dispatch): void {
    dispatch(recipeToCurrentPage(recipe))
    router.push(`/recipePages/${recipe.id}`)
}

export default {
    buttonLinkToRecipePage
}