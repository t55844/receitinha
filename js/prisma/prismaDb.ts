import { PrismaClient } from "@prisma/client";
import { IFormInput } from "../interface_and_ultils/interface";

const prisma = typeof window != "undefined" ? false : new PrismaClient()


const getAllPrisma = (model: string) => async () => {
    const data = prisma ? await prisma[model].findMany() : ''
    return data

}

export const getAllRecipes = getAllPrisma('Recipes')

export const getAllComment = async (id) => {
    const data = await prisma.Comment.findMany({
        where: {
            recipesId: id
        }
    })
    return data
}


const createPrisma = (model: string) => async (recipe: IFormInput) => {
    const response = prisma ? await prisma[model].create({
        data: {
            ...recipe
        }
    }) : ''
    return response
}

export const createRecipe = createPrisma('Recipes')
export const createComment = createPrisma('Comment')


const updatePrisma = (model: string) => async (id: number, data: IFormInput) => {
    try {

        const response = prisma ? await prisma[model].update({
            where: {
                id,
            },
            data,
        }) : ''
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
    const response = prisma ? await prisma[model].delete({
        where: { id },
    }) : ''
    return response

}

export const deleteRecipe = deletePrisma('Recipes')
export const deleteComment = deletePrisma('Comment')

