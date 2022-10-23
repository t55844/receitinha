import { async } from "rxjs"
import { getRecipes, requestModel } from "../fetch/fecth"
import { eventEmitter } from "../interface_and_ultils/EventEmiter"
import { email, IFormInput } from "../interface_and_ultils/interface"
import { menssages } from "../interface_and_ultils/menssages"


function getImageFromInput(): any {
    const inputImgRecipes = document.getElementById('image_upload_input_recipes')
    const image = inputImgRecipes.files[0]

    if (inputImgRecipes.files.length === 0) {
        eventEmitter.dispatch('snackbar_menssage', { type: 'error', menssage: 'Selecione uma imagem sua para a receita' })
    } else {
        return image
    }
}

function sendRequisition(data: IFormInput): void | Promise<any> {
    const formData = new FormData();

    const image = getImageFromInput()

    if (image) {

        formData.append('file', image, email + '_' + image.name)
        formData.append('data', JSON.stringify(data))

        const res = requestModel('http://localhost:3030/api', { method: 'POST', body: formData })
            .then(res => res.json())
            .catch(erro => eventEmitter.dispatch(
                'snackbar_menssage', {
                type: 'error',
                menssage: 'Ocorreu um erro em nosso sistema tente novamente mais tarde'
            }))
        return res
    }

}

// ---------EXPORTS---------- //

function verifyFields(fields: string[], nameOfInputs: string[], data: IFormInput) {

    const have = fields.filter(field => data[field] === '')

    if (have.length != 0) {
        fields.forEach((field, index) => {
            if (data[field] === '') {
                menssages.emiteMensageFields(`O campo ${nameOfInputs[index]} esta vazio falta preencher ele`)
            }
        })
    } else {
        return { erro: false }
    }

}

async function submitRecipe(data: IFormInput) {
    const res = await sendRequisition(data)

    if (res && res.error === false) {
        eventEmitter.dispatch('snackbar_menssage', { type: 'success', menssage: res.menssage })
    }
    else if (res && res.error === true) {
        eventEmitter.dispatch('snackbar_menssage', { type: 'error', menssage: res.menssage })

    }
}

function plusOne(setState: any, currentState: JSX.Element[], component: JSX.Element) {
    const newComponent = currentState.concat(component)
    setState(newComponent)
}

function deleteOne(setState: any, currentState: JSX.Element[], elementKey: string) {
    const newIngredients = currentState.filter(element => element.key !== elementKey)

    setState(newIngredients)
}

export const myRecipesForm = {
    plusOne,
    submitRecipe,
    verifyFields,
    deleteOne
}