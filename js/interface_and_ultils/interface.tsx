export interface IRecipeForm {
    name: string,
    ingredients?: string[],
    preparation: string,
    difficulty: string,
    duration: string,
    img: File | string,
    email: string

}
export interface IRecipeDB {
    id: number,
    email: string,
    name: string,
    ingredients?: { ingredient: string }[],
    preparation: string,
    diffculty: string,
    duration: string,
    img: string
    like: string
    userId: number

}

export interface ICommentDb {
    id: number
    text: string,
    name: string
    recipesId: number
}
export interface ICommentForm {
    text: string,
    email: string,
    name: string
    recipeId: string
}

export interface IUserRegister {
    name: string,
    password: string
    confirmPassword: string
    email: string
}
export interface IUserDb {
    name: string,
    password: string
    confirmPassword: string
    email: string
    id: number
}

export interface IUserLogin {
    password: string
    email: string
}