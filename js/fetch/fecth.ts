import { menssages } from "../interface_and_ultils/menssages"

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



export const urlRecipes = `http://localhost:3000/api/recipes`;
export const urlComments = `http://localhost:3000/api/comments`;
export const urlCloudinary = public_id => `https://res.cloudinary.com/${process.env.IMG_CLOUD_NAME}/image/fetch/${public_id}`
