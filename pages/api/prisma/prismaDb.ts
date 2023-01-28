import { PrismaClient, Prisma } from "@prisma/client";
import { IFormInput } from "../../../js/interface_and_ultils/interface";

const prisma = typeof window != "undefined" ? false : new PrismaClient()


export async function getAllRecipes() {
    const data = prisma ? await prisma.Recipes.findMany() : ''
    return data

}

export async function createRecipe(recipe: IFormInput) {
    const response = prisma ? await prisma.Recipes.create({
        data: {
            ...recipe
        }
    }) : ''
    return response
}

export async function updateRecipe(id: number, data: IFormInput) {
    try {

        const response = prisma ? await prisma.Recipes.update({
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

export async function deleteRecipe(id: number) {
    const response = prisma ? await prisma.Recipes.delete({
        where: { id },
    }) : ''
    return response

}
