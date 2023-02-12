import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { createToken } from "../../../js/jwt/jwt";
const bcrypt = require('bcrypt');
const prisma = typeof window != "undefined" ? false : new PrismaClient()


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = JSON.parse(req.body)
        const user = await prisma.Users.findUnique({
            where: { email },
            select: { email: true, name: true, password: true }
        })

        if (user === null) {
            return res.status(400).send({ error: true, message: "Usuario não existe" })
        } else {

            const result = await bcrypt.compare(password, user.password)
            if (!result) {
                return res.status(400).send({ error: true, message: "Informações erradas" })
            } else {
                const token = createToken(user.email, user.name)
                return res.status(200).send({ error: false, message: "Sucesso", payload: { name: user.name, email: user.email, token } })

            }
        }
    } else {
        return res.status(400).send({
            error: true, message: 'Metodo inválido'

        })

    }
} 
