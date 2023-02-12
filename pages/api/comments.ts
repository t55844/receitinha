import { createComment, deleteComment, getAllComment, updateComment } from "../../js/prisma/prismaDb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {

        const result: [] = await getAllComment(parseInt(req.query.id))
        return res.status(200).json({ error: false, msg: 'success', data: result })
    }
    else if (req.method === "POST") {
        console.log(req.body)

        const comment = req.body

        const response = await createComment(comment)
        const result: [] = await getAllComment(comment.recipesId)
        return res.status(200).json({
            error: false, msg: 'success', response, data: result
        })
    }
    else if (req.method === "PUT") {
        const comment = JSON.parse(req.body)

        const response = await updateComment(comment.id, comment)
        const result: [] = await getAllComment(comment.recipesId)

        return res.status(200).json({ error: false, msg: 'success', response, data: result })

    }
    else if (req.method === "DELETE") {
        const id = JSON.parse(req.body)
        const result = await deleteComment(id)
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