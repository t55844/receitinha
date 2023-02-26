import { PrismaClient } from "@prisma/client";
import { ICommentDb, ICommentForm, IRecipeForm, IRecipeDB, IUserDb } from "../interface_and_ultils/interface";

export const prisma = typeof window != "undefined" ? false : new PrismaClient()


export const getAllRecipes = async (): Promise<IRecipeDB[]> => {
    const data: IRecipeDB[] = await prisma.recipes.findMany({
        include: {
            Likes: true
        }
    }
    )
    return data

}


export async function getMyRecipes(email: string): Promise<IRecipeDB[]> {

    const data: { recipes: IRecipeDB[] }[] = await prisma.users.findMany({
        where: {
            email
        },
        include: {
            Recipes: {
                include: {
                    Likes: true
                }
            }

        }
    })
    console.log(data)


    return data[0].Recipes
}

export const getComment = async (id: string): Promise<ICommentDb[]> => {
    const data: [{ comments: ICommentDb[] }] = await prisma.recipes.findMany({
        where: {
            id: id
        },
        select: {
            comments: true
        }
    })


    return data[0].comments
}


export const createComment = async (data: ICommentForm): Promise<ICommentDb> => {


    const response: ICommentDb = await prisma.comment.create({
        data: {
            name: data.name,
            text: data.text,
            recipesId: data.recipeId

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

export async function createLike(body: { userId: number, recipeId: number }): Promise<IRecipeDB> {

    const check: IRecipeDB[] = await prisma.Likes.findMany({
        where: {
            usersId: body.userId,
            recipesId: body.recipeId

        }
    })
    if (check.length > 0) {

        return null
    }
    const like = await prisma.Likes.create({
        data: {
            usersId: body.userId,
            recipesId: body.recipeId,
        }
    })
    const user = await prisma.Users.update({
        where: {
            id: body.userId
        },
        data: {
            likes: like.id,
        }
    })

    const recipe = await prisma.Recipes.update({
        where: {
            id: body.recipeId

        },
        data: {
            like: like.id

        },
        include: {
            Likes: true
        }
    })

    return recipe
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

