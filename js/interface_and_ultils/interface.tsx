export interface IFormInput {
    name: string,
    ingredient?: string[],
    preparation: string,
    difficulty: string,
    duration: string,
    img: File | string

}
export interface IRecipeFromDB {
    id: number,
    email: string,
    name: string,
    ingredient?: string[],
    preparation: string,
    diffculty: string,
    duration: string,
    img: File | string
}

export interface IComment {
    text: string,
    email: string,
    name: string
}

export interface IUserRegister {
    name: string,
    password: string
    confirmPassword: string
    email: string
}

export interface IUserLogin {
    password: string
    email: string
}