import { requestModel } from "../fetch/fecth"
import { eventEmitter } from "../interface_and_ultils/EventEmiter"
import { IFormInput } from "../interface_and_ultils/interface"
import { menssages } from "../interface_and_ultils/menssages"


function sendRequisition(data: IFormInput, email: string): void | Promise<any> {
    const formData = new FormData();

    formData.append('file', data.img[0], email + '_' + data.img[0].name)
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

// ---------EXPORTS---------- /

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

export const myRecipesForm = {
    submitRecipe,
    deleteRecipe,
    updateRecipe
}