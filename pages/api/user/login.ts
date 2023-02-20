import { NextApiRequest, NextApiResponse } from "next";
import { createToken } from "../../../js/jwt/jwt";
import nookies from 'nookies'
import { prisma } from "../../../js/prisma/prismaDb";
import { IUserDb, IUserLogin } from "../../../js/interface_and_ultils/interface";
import { IResponse } from "../recipes";
import { response, response } from "express";

const bcrypt = require('bcrypt');


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const userReq: IUserLogin = JSON.parse(req.body)
        const user: IUserDb | null = await prisma.Users.findUnique({
            where: { email: userReq.email },
            select: { email: true, name: true, password: true }
        })

        if (user === null) {
            const response: IResponse = { error: true, msg: "Usuario não existe" }
            return res.status(400).send(response)
        } else {

            const result: boolean = await bcrypt.compare(userReq.password, user.password)
            if (!result) {
                const response: IResponse = { error: true, msg: "Informações erradas" }
                return res.status(404).send(response)
            } else {
                const token: string = createToken(user.email, user.name)
                nookies.set({ res }, 'receitinha-token', token, {
                    maxAge: 60 * 60 * 16,
                    path: '/',
                })
                const response: IResponse = { error: false, msg: "Sucesso", data: { name: user.name, email: user.email } }

                return res.status(200).send(response)

            }
        }
    } else {
        const response: IResponse = { error: true, msg: 'Metodo inválido' }
        return res.status(400).send(response)

    }
} 
