import { NextApiRequest, NextApiResponse } from "next"
import { ICommentDb, ICommentForm } from "../../../js/interface_and_ultils/interface"
import { createComment, deleteComment, getComment, updateComment } from "../../../js/prisma/prismaDb"
import { IResponse } from "./recipes"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const id: string = req.query.id

        const result: ICommentDb[] = await getComment(id)
        const response: IResponse = { error: false, msg: 'success', data: result }
        return res.status(200).json(response)
    }
    else if (req.method === "POST") {

        const comment: ICommentForm = req.body

        const resp: ICommentDb = await createComment(comment)
        const result: ICommentDb[] = await getComment(comment.recipeId)
        const response: IResponse = { error: false, msg: 'success', data: result }

        return res.status(200).json(response)
    }
    else if (req.method === "PUT") {
        const comment = JSON.parse(req.body)
        const resp: ICommentDb = await updateComment(comment.id, comment)
        const result: ICommentDb[] = await getComment(comment.email)
        const response: IResponse = { error: false, msg: 'success', data: result }

        return res.status(200).json(response)

    }
    else if (req.method === "DELETE") {
        const id: number = JSON.parse(req.body)
        const result = await deleteComment(id)
        if (result) {
            const response: IResponse = { error: false, msg: 'success', data: result }
            return res.status(200).json(response)

        } else {
            const response: IResponse = { error: true, msg: 'error' }
            return res.status(400).json(response)
        }
    }
    else {
        const response: IResponse = { error: true, msg: 'Bad Request' }

        return res.status(400).json(response)
    }
}