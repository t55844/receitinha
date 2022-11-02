function testArrayLength(array: any): { error: boolean, menssage: string } {
    if (!Array.isArray(array)) {
        return {
            error: true,
            menssage: 'O parametro nao e um array'
        }
    }
    if (array.length != 0) {
        return {
            error: false,
            menssage: 'O array nao esta vazio'
        }
    } else {
        return {
            error: true,
            menssage: 'O array esta vazio'
        }
    }
}

export const tests = {
    testArrayLength,
}