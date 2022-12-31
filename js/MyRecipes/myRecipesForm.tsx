import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"
import { requestModel } from "../fetch/fecth"
import { eventEmitter } from "../interface_and_ultils/EventEmiter"
import { IFormInput } from "../interface_and_ultils/interface"
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


function sendRequisition(data: IFormInput, email: string): void | Promise<any> {
    const formData = new FormData();

    const image = getImageFromInput()

    if (image) {

        formData.append('file', image, email + '_' + image.name)
        formData.append('data', JSON.stringify({ ...data, email }))

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

function verifyFields(fields: Array<[string, string]>, data: IFormInput) {
    const regexHaveLetters = new RegExp('^[a-zA-Z0-9]*', 'g')
    const have = fields.filter(field => {
        const testField = data[field[0]]
        console.log(testField)
        console.log(!regexHaveLetters.test(testField))
        return regexHaveLetters.test(testField)
    })
    console.log(have)
    if (have.length != 0) {
        have.forEach((field, index) => {
            menssages.emiteMensageFields(`O campo ${field[1]} esta vazio ou com muito espaço no começo e final`)
        })
    } else {
        return { erro: false }
    }

}

async function submitRecipe(data: IFormInput, email: string) {


    const res = await sendRequisition(data, email)

    if (res && res.error === false) {
        eventEmitter.dispatch('snackbar_menssage', { type: 'success', menssage: res.menssage })
        return res
    }
    else if (res && res.error === true) {
        eventEmitter.dispatch('snackbar_menssage', { type: 'error', menssage: res.menssage })
        return res
    }
}

function deleteInput(setIngredientFields, ingredientFields: ReactJSXElement[], inputToDelete: string) {
    const newList = ingredientFields.filter(element => {
        return element.key != inputToDelete
    })
    setIngredientFields(newList)
}

export const myRecipesForm = {
    submitRecipe,
    verifyFields,
    deleteInput
}