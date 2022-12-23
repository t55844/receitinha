import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import PageMyRecipes from "../../components/MyRecipes/PageMyRecipes"
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux'
import store from '../../js/redux/store'

global.fetch = jest.fn().mockImplementation(() => new Promise((resolve, reject,) => {
    setTimeout(() => resolve(undefined), 1000)

}));

describe('<PageMyRecipes />', () => {

    test('Funcionamento das abas', async () => {
        const user = userEvent.setup()
        await act(async () => { render(<Provider store={store}><PageMyRecipes /></Provider>) })

        expect(screen.queryByLabelText('form-myRecipe')).toBeNull()
        await user.click(screen.getByText('Enviar uma receita'))
        expect(screen.getByLabelText('formulario envio de receita')).not.toBeNull()

        await user.click(screen.getByText('Minhas receitas'))
        expect(screen.queryByLabelText('form-myRecipe')).toBeNull()

    })
})

describe('<MyRecipeList />', () => {
    test('Visualização da aba MINHAS RECEITAS', async () => {

        const { rerender } = render(<Provider store={store}><PageMyRecipes /></Provider>)
        expect(screen.getByLabelText('carregando')).toBeInTheDocument()

        setTimeout(() => {
            rerender(<Provider store={store}><PageMyRecipes /></Provider>)
            expect(screen.queryByLabelText('carregando')).toBeNull()
        }, 1001)

    })

    test('Conteudo', async () => {


        await act(async () => { render(<Provider store={store}><PageMyRecipes /></Provider>) })
        setTimeout(
            () => expect(screen.queryByText('Não existe receita ainda, tente mandar uma clicando na aba Enviar uma Receita')).toBeInTheDocument()
            , 1000
        )

    })
})