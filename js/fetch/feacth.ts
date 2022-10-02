import { IFormInput } from "../interface/form"

export function requestModel(url: string, method: string, headers: { 'Content-Type': string }, body: any) {
    fetch(url, {
        method,
        headers,
        body,
    })
        .then(res => res.json())
        .then(console.log)
        .catch(erro => console.log(erro))

}

export async function getRecipes() {
    try {
        const res = await fetch('http://localhost:3030/api')
        const res_1 = await res.json()
        return res_1
    } catch (erro) {
        return console.log('Erro' + erro)
    }
}


