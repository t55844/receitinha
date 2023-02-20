import jwt, { JwtPayload } from 'jsonwebtoken';

export function createToken(email: string, name: string): string {

    const token = jwt.sign({ email, name }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 16 })
    return token

}

export function checkToken(token: string): string | JwtPayload {
    const result = jwt.verify(token, process.env.JWT_KEY)
    return result
}