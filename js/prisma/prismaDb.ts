import { PrismaClient } from "@prisma/client";
import { ICommentDb, ICommentForm, IRecipeForm, IRecipeDB, IUserDb } from "../interface_and_ultils/interface";

export const prisma = typeof window != "undefined" ? false : new PrismaClient()


export const getAllRecipes = async (): Promise<IRecipeDB[]> => {
    const data: IRecipeDB[] = await prisma.recipes.findMany()
    return data

}


export async function getMyRecipes(email: string): Promise<IRecipeDB[]> {
    const data: { recipes: IRecipeDB[] }[] = await prisma.users.findMany({
        where: {
            email
        },
        select: {
            recipes: true

        }
    })
    return data[0].recipes
}

export const getComment = async (email: string): Promise<ICommentDb[]> => {
    const data: [{ comments: ICommentDb[] }] = await prisma.recipes.findMany({
        where: {
            email: email
        },
        select: {
            comments: true
        }
    })

    console.log(data[0].comments)

    return data[0].comments
}


export const createComment = async (data: ICommentForm): Promise<ICommentDb> => {
    const recipe: IRecipeDB = await prisma.recipes.findMany({
        where: {
            email: data.email

        }
    })


    const response: ICommentDb = await prisma.comment.create({
        data: {
            name: data.name,
            text: data.text,
            recipesId: recipe[0].id
        }
    })
    return response
}

export const createRecipe = async (recipe: IRecipeForm): Promise<IRecipeDB> => {
    const user: IUserDb = await prisma.users.findUnique({
        where: {
            email: recipe.email

        }
    })
    const response: IRecipeDB = await prisma.recipes.create({
        data: {
            ...recipe,
            usersId: user.id
        },
    })
    return response
}


const updatePrisma = (model: string) => async (id: number, data: any): Promise<any> => {
    try {

        const response = await prisma[model].update({
            where: {
                id,
            },
            data,
        })
        return response
    } catch (error) {
        if (error.meta.cause == 'Record to update not found.') {
            return false
        }
    }

}

export const updateRecipe = updatePrisma('Recipes')
export const updateComment = updatePrisma('Comment')


const deletePrisma = (model: string) => async (id: number) => {
    const response = await prisma[model].delete({
        where: { id },
    })
    return response

}

export const deleteRecipe = deletePrisma('Recipes')
export const deleteComment = deletePrisma('Comment')

