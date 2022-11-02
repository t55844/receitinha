import { menssages } from "../interface_and_ultils/menssages"
import { tests } from "../interface_and_ultils/tests"

export function requestModel(url: string, optons: { method: string, body?: any, headers?: { 'Content-Type': string } }): Promise<any> {
    const { method, headers, body } = optons
    return fetch(url, {
        method,
        headers,
        body,
    })
        .then(res => res)
        .catch(erro => menssages.emiteMensageError(`erro com o servidor tente novamente mais tarde`))

}

export function getRecipes(id): Promise<[] | void | Response> {

    return fetch(`http://localhost:3030/api/?id=${id}`)
        .then(res => res.json())
        .then(res => res)
        .catch(error => menssages.emiteMensageError(`erro ao pegar as receitas `))

}


