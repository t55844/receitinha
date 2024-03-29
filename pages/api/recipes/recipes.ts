import { NextApiRequest, NextApiResponse } from "next"
import { uploadImage } from "../cloudinary"
import { deleteRecipe, createRecipe, getAllRecipes, updateRecipe, getMyRecipes, prisma, createLike } from "../../../js/prisma/prismaDb"
import { IRecipeDB, IRecipeForm } from "../../../js/interface_and_ultils/interface"

export interface IResponse {
    error: boolean
    msg: string
    data?: any

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET" && req.query.id) {
        const email: string = req.query.id


        const result: IRecipeDB[] = await getMyRecipes(email)
        const response: IResponse = { error: false, msg: 'success', data: result }

        return res.status(200).json(response)
    }
    else if (req.method === "POST") {
        const recipe: IRecipeForm = JSON.parse(req.body)


        if (recipe.img.split('').slice(-4).join('') === '.jpg') {
            const resp: IRecipeDB = await createRecipe(recipe)
            const result: IRecipeDB[] = await getMyRecipes(recipe.email)
            const response: IResponse = { error: false, msg: 'success', data: result }

            return res.status(200).json(response)

        }
        const upload: string = await uploadImage(recipe.img)
        if (typeof upload !== "string") {

            const response: IResponse = { error: true, msg: 'Falha ao tentar salvar a imagem' }


            return res.status(400).json(response)

        } else {
            recipe.img = upload

            const resp: IRecipeDB = await createRecipe(recipe)
            const result: IRecipeDB[] = await getMyRecipes(recipe.email)
            const response: IResponse = { error: false, msg: 'success', data: result }

            return res.status(200).json(response)

        }

    }
    else if (req.method === "PUT" && !req.query.like) {
        const recipe: IRecipeForm = JSON.parse(req.body)
        let upload: string = ''

        if (/data:image/.test(recipe.img)) {
            upload = await uploadImage(recipe.img)
        }

        if (typeof upload !== "string") {
            const response: IResponse = { error: true, msg: 'Falha ao tentar salvar a imagem' }

            return res.status(400).json(response)
        } else {

            if (upload.length > 0) { recipe.img = upload }
            const resp: string = await updateRecipe(recipe.id, recipe)
            if (resp === false) {
                const response: IResponse = { error: true, msg: 'Nao foi possivel encontrar a receita' }
                return res.status(400).json(response)

            }
            const result: IRecipeDB[] = await getMyRecipes(recipe.email)
            const response: IResponse = { error: false, msg: 'success', data: result }

            return res.status(200).json(response)

        }
    }
    else if (req.method === "DELETE") {
        const id: number = JSON.parse(req.body)
        const result = await deleteRecipe(id)
        if (result) {
            const response: IResponse = { error: false, msg: 'success', data: result }
            return res.status(200).json(response)
        } else {
            const response: IResponse = { error: true, msg: 'error' }
            return res.status(400).json(response)

        }
    }
    else if (req.method === "PUT" && req.query.like) {
        const body: { userId: number, recipeId: number } = JSON.parse(req.body)

        const result = await createLike(body)

        if (!result) {
            const response: IResponse = { error: true, msg: 'voce ja deu like nessa receita' }
            return res.status(400).json(response)

        }

        const response: IResponse = { error: false, msg: 'success', data: result }
        return res.status(200).json(response)

    }
    else {
        const response: IResponse = { error: true, msg: 'Bad Request' }

        return res.status(400).json(response)
    }

}