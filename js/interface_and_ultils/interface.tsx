export interface IFormInput {
    name: string,
    ingredient?: string[],
    preparation: string,
    difficulty: string,
    duration: string,
}
export interface IRecipeFromDB {
    id: number,
    email: string,
    name: string,
    ingredient?: string[],
    preparation: string,
    diffculty: string,
    duration: string,
}

export interface IComment {
    text: string,
    email: string,
    name: string
}

