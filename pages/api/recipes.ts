import { IFormInput } from "../../js/interface_and_ultils/interface"
import { uploadImage } from "./cloudinary"
import { deleteRecipe, createRecipe, getAllRecipes, updateRecipe } from "./prisma/prismaDb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {

        const result: [] = await getAllRecipes()
        return res.status(200).json({ error: false, msg: 'success', data: result })
    }
    else if (req.method === "POST") {
        const recipe = JSON.parse(req.body)

        const upload = await uploadImage(recipe.img)
        if (typeof upload !== "string") {

            return res.status(400).json({ error: true, msg: 'Falha ao tentar salvar a imagem' })
        } else {
            recipe.img = upload

            const response = await createRecipe(recipe)
            const result: [] = await getAllRecipes()
            return res.status(200).json({
                error: false, msg: 'success', response, data: result
            })
        }

    }
    else if (req.method === "PUT") {
        const recipe = JSON.parse(req.body)
        const upload = await uploadImage(recipe.img)
        if (typeof upload !== "string") {

            return res.status(400).json({ error: true, msg: 'Falha ao tentar salvar a imagem' })
        } else {
            recipe.img = upload

            const response = await updateRecipe(recipe.id, recipe)
            const result: [] = await getAllRecipes()

            return res.status(200).json({ error: false, msg: 'success', response, data: result })

        }
    }
    else if (req.method === "DELETE") {
        const id = JSON.parse(req.body)
        const result = await deleteRecipe(id)
        if (result) {
            return res.status(200).json({ error: false, msg: 'success', data: result })
        } else {
            return res.status(400).json({ error: true, msg: 'error' })
        }
    }
    else {
        return res.status(400).json({ error: true, msg: 'Bad Request' })
    }

}