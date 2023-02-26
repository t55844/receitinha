import { JwtPayload } from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next"
import { checkToken } from "../../../js/jwt/jwt"
import { IResponse } from "../recipes/recipes"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const token: string = req.headers.authorization
        const result = checkToken(token)
        if (result === undefined) {
            return res.status(401).send({ error: true, message: "Token quebrado" })
        }
        else {
            return res.status(200).send({ error: false, message: 'Verificado', payload: result })
        }
    }
    if (req.method === "POST") {
        const { token } = JSON.parse(req.body)
        const result: string | JwtPayload = checkToken(token)
        if (result === undefined) {
            const response: IResponse = { error: true, msg: "Token inválido" }

            return res.status(401).send(response)
        }
        else {
            const response: IResponse = { error: false, msg: 'Verificado', data: result }
            return res.status(200).send(response)
        }
    } else {
        res.status(405).send({ error: true, message: "Method não permitido" })
    }

}