import { IFormInput } from "../interface_and_ultils/form"

export function requestModel(url: string, optons: { method: string, headers?: { 'Content-Type': string }, body?: any }): Promise<any> {
    const { method, headers, body } = optons
    return fetch(url, {
        method,
        headers,
        body,
    })
        .then(res => res)
        .catch(erro => console.log(erro))

}

export async function getRecipes(id) {
    try {
        const res = await fetch(`http://localhost:3030/api/?id=${id}`)
        const res_1 = await res.json()
        return res_1
    } catch (erro) {
        return console.log('Erro' + erro)
    }
}


