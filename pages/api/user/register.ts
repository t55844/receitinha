import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { createToken } from "../../../js/jwt/jwt";

const prisma = typeof window != "undefined" ? false : new PrismaClient()

const bcrypt = require('bcrypt');
const saltRounds = 10;

function createUser(name: string, email: string, password: string, res: NextApiResponse) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {

            const resp = await prisma.Users.create({
                data: { name, email, password: hash },
                select: { name: true, email: true }
            })
            const token = createToken(resp.email, resp.name)
            return res.status(201).send({ error: false, payload: { name: resp.name, email: resp.email, token } })
        });
    });

}

async function checkUserEmail(email: string) {
    const check = await prisma.Users.findUnique({
        where: {
            email: email,
        },
    })
    return check
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, password } = JSON.parse(req.body)

        const check = await checkUserEmail(email)

        if (check !== null) {
            return res.status(400).json({ error: true, message: `Usuario ja existente` })
        } else {

            createUser(name, email, password, res)

        }
    }
}