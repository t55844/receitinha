import { NextApiRequest, NextApiResponse } from "next"
import { IRecipeDB } from "../../js/interface_and_ultils/interface"
import { getAllRecipes } from "../../js/prisma/prismaDb"
import { IResponse } from "./recipes/recipes"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {

        const result: IRecipeDB[] = await getAllRecipes()
        const response: IResponse = { error: false, msg: 'success', data: result }

        return res.status(200).json(response)
    } else {
        const response: IResponse = { error: true, msg: 'Bad Request' }

        return res.status(400).json(response)
    }

}