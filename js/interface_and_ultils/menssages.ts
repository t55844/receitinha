import { eventEmitter } from "./EventEmiter"

function emiteMensageError(menssage: string): void {
    const feedback = { type: 'error', menssage }
    eventEmitter.dispatch('snackbar_menssage', feedback)
}

export const menssages = {
    emiteMensageError
}