import { PrismaClient } from "@prisma/client";

const prisma = typeof window != "undefined" ? false : new PrismaClient()


export async function getAllRecipes() {
    const data = prisma ? await prisma.Recipes.findMany() : ''
    console.log(data)
    return data

}

export async function createRecipe(recipe) {
    const response = prisma ? await prisma.Recipes.create({
        data: {
            ...recipe
        }
    }) : ''
}