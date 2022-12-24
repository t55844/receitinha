import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import RecipeComments from '../../components/RecipePage/RecipeComments'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'



const initialState = {
    recipePage: {
        value: {
            id: 2,
            name: 'bolo',
            difficulty: 'Facil',
            duration: '30 minutos',
            preparation: 'compra massa pre-pronta, pois e mais facil',
            email: 'guto22@yahoo.com',
            ingredient: ['agua', 'leite', 'trigo', 'aveia', 'banana']
        }
    },
    user: {
        value: {
            name: 'beto',
            email: 'beto22@beto.com'
        }
    }
};
const mockStore = configureStore();
let store;

global.fetch = jest.fn().mockImplementation(() => new Promise((resolve, reject,) => {
    resolve({
        payload: [
            {
                recipeId: 3,
                name: 'Joao',
                email: 'j22@ot.com',
                text: 'muito bom'
            }
        ],
        json: () => {
            return {
                payload: [
                    {
                        recipeId: 3,
                        name: 'Joao',
                        email: 'j22@ot.com',
                        text: 'muito bom'
                    }
                ]
            }
        }
    })

}));

describe('recipeComments', () => {
    store = mockStore(initialState)

    test('digitando um commentario', async () => {
        const user = userEvent.setup()

        render(<Provider store={store}><RecipeComments /></Provider>)

        const input = screen.queryByLabelText('Escreva seu comentario aqui')
        expect(input).toBeInTheDocument()

        await user.type(input, 'muito bom')

        expect(screen.queryByDisplayValue('muito bom')).not.toBeNull()
        expect(input.innerHTML.length).not.toEqual('0')

        const sendButton = screen.queryByText('Enviar')
        await user.click(sendButton)

        expect(input.innerHTML.length).toEqual(0)
        expect(screen.queryByText('muito bom')).not.toBeNull()


    })

    test('Comentario vazio', async () => {
        const user = userEvent.setup()

        render(<Provider store={store}><RecipeComments /></Provider>)

        const input = screen.queryByLabelText('Escreva seu comentario aqui')
        expect(input).toBeInTheDocument()

        await user.type(input, ' ')

        expect(input.innerHTML.length).toEqual(0)

        const sendButton = screen.queryByText('Enviar')
        await user.click(sendButton)

        expect(input.innerHTML.length).toEqual(0)

    })
})