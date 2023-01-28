import { deleteRecipe, createRecipe, getAllRecipes, updateRecipe } from "./prisma/prismaDb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {

        const result = await getAllRecipes()

        return res.status(200).json({ error: false, msg: 'success', data: result })
    }
    else if (req.method === "POST") {

        const recipe = JSON.parse(req.body)
        const response = await createRecipe(recipe)
        return res.status(200).json({ error: false, msg: 'success', response })
    }
    else if (req.method === "PUT") {
        const recipe = JSON.parse(req.body)
        const result = updateRecipe(recipe.id, recipe)
        return res.status(200).json({ error: true, msg: 'success', data: result })

    }
    else if (req.method === "DELETE") {
        const id = JSON.parse(req.body)
        const result = deleteRecipe(id)
        return res.status(200).json({ error: false, msg: 'success', data: result })

    }
    else {
        return res.status(400).json({ error: true, msg: 'Bad Request' })
    }

}