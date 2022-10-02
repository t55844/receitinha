import { getRecipes, requestModel } from "../fetch/feacth"
import { IFormInput } from "../interface/form"

function plusOne(setState: any, currentState: JSX.Element[], component: JSX.Element) {
    const newComponent = currentState.concat(component)
    setState(newComponent)
}
async function getImage() {

    const res = await getRecipes()
    const img = res[1].image
    return img
}

async function sendRecipesInfo(data: IFormInput) {

    const headers = {
        'Content-Type': 'application/json ',
    }
    const body = JSON.stringify(data)
    const res = requestModel('http://localhost:3030/api', 'POST', headers, body)
    console.log('send Info', res)
}

async function sendRecipesImage(img: File) {
    console.log(typeof img)
    const formData = new FormData();
    const inputImgRecipes = document.getElementById('image_upload_input_recipes').files[0]
    console.log(inputImgRecipes)
    formData.append('file', inputImgRecipes)


    const res = await fetch('http://localhost:3030/api/up', {
        method: 'POST',
        body: formData
    });

    // ...res = requestModel('http://localhost:3030/api/up', 'POST', headers, img)
    res.json().then(res => console.log('send Img', res))

}

function submitRecipe(data: IFormInput, img: File) {
    sendRecipesImage(img)
    //sendRecipesInfo(data)
}

export const myRecipes = {
    plusOne,
    getImage,
    submitRecipe
}