import jwt from 'jsonwebtoken';

export function createToken(email: string, name: string) {

    const token = jwt.sign({ email, name }, process.env.JWT_KEY, { expiresIn: 60 * 60 })
    return token

}

export function checkToken(token: string) {
    const result = jwt.verify(token, process.env.JWT_KEY)
    return result
}