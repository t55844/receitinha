import { NextApiRequest, NextApiResponse } from "next"
import { checkToken } from "../../../js/jwt/jwt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const token = req.headers.authorization
        const result = checkToken(token)
        console.log(result)
        if (result === undefined) {
            return res.status(401).send({ error: true, message: "Token quebrado" })
        }
        else {
            return res.status(200).send({ error: false, message: 'Verificado', payload: result })
        }
    }
    if (req.method === "POST") {
        const { token } = JSON.parse(req.body)
        const result = checkToken(token)
        console.log(result)
        if (result === undefined) {
            return res.status(401).send({ error: true, message: "Token quebrado" })
        }
        else {
            return res.status(200).send({ error: false, message: 'Verificado', payload: result })
        }
    } else {
        res.status(405).send({ error: true, message: "Method não permitido" })
    }

}