import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import RecipeDetails from '../../components/MyRecipes/RecipeDetails'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

describe('<RecipeDetails />', () => {
    const recipe = {
        name: 'bolo',
        difficulty: 'Facil',
        duration: '30 minutos',
        preparation: 'compra massa pre-pronta, pois e mais facil',
        img: '../../public/imagem_para_testes.jpg',
        ingredient: ['agua', 'leite', 'trigo', 'aveia', 'banana']
    }

    const name = 'pao'

    const initialState = {
        recipe: {
            id: 2,
            name: 'bolo',
            difficulty: 'Facil',
            duration: '30 minutos',
            preparation: 'compra massa pre-pronta, pois e mais facil',
            email: 'guto22@yahoo.com',
            ingredient: ['agua', 'leite', 'trigo', 'aveia', 'banana']
        }
    };
    const mockStore = configureStore();
    let store;
    test('verificando o conteudo estatico', () => {
        store = mockStore(initialState)
        const user = userEvent.setup()

        render(<Provider store={store}><RecipeDetails name={name} recipe={recipe} /></Provider>)

        expect(screen.getByText(recipe.name)).toBeInTheDocument()
        expect(screen.getByText(recipe.difficulty)).toBeInTheDocument()
        expect(screen.getByText(recipe.duration)).toBeInTheDocument()
        expect(screen.getByRole('img')).toBeInTheDocument()

    })

    test('verificando a funcionalidade esconde e mostra mais detalhes', async () => {
        store = mockStore(initialState)
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