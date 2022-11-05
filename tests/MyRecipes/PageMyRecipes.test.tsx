import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import PageMyRecipes from "../../components/MyRecipes/PageMyRecipes"
import { act } from 'react-dom/test-utils'

describe('<PageMyRecipes />', () => {

    test('Funcionamento das abas', async () => {
        const user = userEvent.setup()
        await act(async () => { render(<PageMyRecipes />) })

        expect(screen.queryByLabelText('form-myRecipe')).toBeNull()
        await user.click(screen.getByText('Enviar uma receita'))
        expect(screen.getByLabelText('formulario envio de receita')).not.toBeNull()

        await user.click(screen.getByText('Minhas receitas'))
        expect(screen.queryByLabelText('form-myRecipe')).toBeNull()

    })
})

describe('<MyRecipeList />', () => {
    test('Visualização da aba MINHAS RECEITAS', async () => {

        render(<PageMyRecipes />)
        expect(screen.getByLabelText('carregando')).toBeInTheDocument()

        await act(async () => { render(<PageMyRecipes />) })
        expect(screen.queryByLabelText('carregando')).toBeNull()

    })

    test('Conteudo', async () => {

        await act(async () => { render(<PageMyRecipes />) })
        expect(screen.getByText('Não existe receita ainda, tente mandar uma clicando na aba')).toBeInTheDocument()

    })
})