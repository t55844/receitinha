import { NextApiRequest, NextApiResponse } from "next";
import { createToken } from "../../../js/jwt/jwt";
import nookies from 'nookies'
import { prisma } from "../../../js/prisma/prismaDb";
import { IUserDb, IUserRegister } from "../../../js/interface_and_ultils/interface";
import { IResponse } from "../recipes/recipes";


const bcrypt = require('bcrypt');

const saltRounds = 10;

async function createHash(password: string): Promise<HashAlgorithmIdentifier> {

    return await bcrypt.hash(password, saltRounds).then((hash) => hash);

}

async function createUser(name: string, email: string, password: string): Promise<IUserDb> {

    const hash = await createHash(password)

    const resp: IUserDb = await prisma.Users.create({
        data: { name, email, password: hash },
        select: { name: true, email: true, id: true }
    })

    return resp
}


async function checkUserEmail(email: string): Promise<IUserDb | null> {
    const check: IUserDb | null = await prisma.Users.findUnique({
        where: {
            email: email,
        },
    })
    return check
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const user: IUserRegister = JSON.parse(req.body)

        const check: IUserDb | null = await checkUserEmail(user.email)

        if (check !== null) {
            const response: IResponse = { error: true, msg: `Usuario ja existente` }
            return res.status(400).json(response)
        } else {

            const userDb: IUserDb = await createUser(user.name, user.email, user.password)
            const token: string = createToken(userDb.email, userDb.name, userDb.id)

            nookies.set({ res }, 'receitinha-token', token, {
                maxAge: 60 * 60 * 16,
                path: '/',
            })
            const response: IResponse = {
                error: false, msg: 'Usuario criado com sucesso', data: { userDb }
            }

            return res.status(201).send(response)
        }
    } else {
        const response: IResponse = { error: true, msg: 'Metodo nao permitido' }

        return res.status(400).json(response)
    }
}