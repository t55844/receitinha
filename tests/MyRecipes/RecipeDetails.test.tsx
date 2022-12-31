import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import RecipeDetails from '../../components/MyRecipes/RecipeDetails'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import fakeMock from '../testHandler/fakeMock'

global.URL = fakeMock.fakeURL
const store = fakeMock.fakeStore
const recipe = fakeMock.recipe

describe('<RecipeDetails />', () => {
    test('verificando o conteudo estatico', () => {
        const user = userEvent.setup()

        render(<Provider store={store}><RecipeDetails name={name} recipe={recipe} /></Provider>)

        expect(screen.getByText(recipe.name)).toBeInTheDocument()
        expect(screen.getByText(recipe.difficulty)).toBeInTheDocument()
        expect(screen.getByText(recipe.duration)).toBeInTheDocument()
        expect(screen.getByRole('img')).toBeInTheDocument()

    })

    test('verificando a funcionalidade esconde e mostra mais detalhes', async () => {
        const user = userEvent.setup()

        render(<Provider store={store}><RecipeDetails name={name} recipe={recipe} /></Provider>)

        expect(screen.queryByLabelText('show more')).not.toBeNull()

        const button = screen.getByLabelText('show more')

        expect(screen.queryByText('Ingredientes')).toBeNull()
        expect(screen.queryByText(recipe.preparation)).toBeNull()

        await user.click(button)

        expect(screen.getByText('Ingredientes')).toBeInTheDocument()
        expect(screen.getByText(recipe.preparation)).toBeInTheDocument()

    })
})