import { IComment, IRecipeFromDB } from "../interface_and_ultils/interface"
import { recipeToCurrentPage } from "../redux/reduxSlice/recipePageSlice"
import { requestModel } from '../fetch/fecth'


function buttonLinkToRecipePage(recipe: IRecipeFromDB, router, dispatch): void {
    dispatch(recipeToCurrentPage(recipe))
    router.push(`/recipePages/${recipe.id}`)
}

async function sendComment(data: IComment) {
    const resp = await requestModel('http://localhost:3030/api/comments', { method: 'POST', body: JSON.stringify(data), headers: { "Content-Type": ' application/json' } })
    const comments = await resp.json()
    return comments
}

async function getComments() {
    const resp = await requestModel('http://localhost:3030/api/comments', { method: 'GET' })
    const contents = await resp.json()
    return contents

}

export default {
    buttonLinkToRecipePage,
    sendComment,
    getComments
}