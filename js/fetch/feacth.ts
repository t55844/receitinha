import { IFormInput } from "../interface/form"

export function save(data: IFormInput) {
    const body = JSON.stringify(data)
    console.log(body)
    fetch('http://localhost:3030/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    })
        .then(res => res.json())
        .then(console.log)
        .catch(erro => console.log(erro))

}

export function getRecipes() {
    fetch('http://localhost:3030/api')
        .then(res => res.json())
        .then(console.log)
        .catch(erro => console.log(erro))
}


