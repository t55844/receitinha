import { getRecipes, requestModel } from "../fetch/feacth"
import { email, IFormInput } from "../interface/form"

function plusOne(setState: any, currentState: JSX.Element[], component: JSX.Element) {
    const newComponent = currentState.concat(component)
    setState(newComponent)
}

async function sendRecipesInfo(data: IFormInput) {

    const headers = {
        'Content-Type': 'application/json ',
    }
    const body = JSON.stringify(data)
    const options = { method: 'POST', headers, body }
    const res = requestModel('http://localhost:3030/api', options)
}

async function sendRecipesImage(img: File) {
    const formData = new FormData();
    const inputImgRecipes = document.getElementById('image_upload_input_recipes').files[0]
    formData.append('file', inputImgRecipes, email + '_' + inputImgRecipes.name)


    const res = await fetch('http://localhost:3030/api/up', {
        method: 'POST',
        body: formData
    });

    //res.json().then(res => console.log('send Img', res))

}

function submitRecipe(data: IFormInput, img: File) {
    sendRecipesImage(img)
    sendRecipesInfo(data)
}

export const myRecipesForm = {
    plusOne,
    submitRecipe
}