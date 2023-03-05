import { menssages } from "../interface_and_ultils/menssages"



export function requestModel(url: string, optons: { method: string, body?: any, headers?: { 'Content-Type': string } }): Promise<any> {

    const { method, headers, body } = optons
    return fetch(url, {
        method,
        headers: {
            ...headers
        },
        body,
    })
        .then(res => res)
        .catch(erro => menssages.emiteMensageError(`erro com o servidor tente novamente mais tarde: ${erro}`))

}

const baseUrl = '/' // 'http://localhost:3000/'
export const urlAuth = baseUrl + 'api/user/auth'
export const urlLogin = baseUrl + 'api/user/login'
export const urlRegister = baseUrl + 'api/user/register'
export const urlRecipes = baseUrl + `api/recipes/recipes`;
export const urlMyRecipes = (id: string) => baseUrl + `api/recipes/recipes?id=${id}`;
export const urlComments = baseUrl + `api/recipes/comments`;
export const urlCloudinary = public_id => `https://res.cloudinary.com/${process.env.IMG_CLOUD_NAME}/image/fetch/${public_id}`
