import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

//import img from '../../public\imagem_para_testes.jpg'
import RecipeDetails from '../../components/MyRecipes/RecipeDetails'

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

    test('verificando o conteudo estatico', () => {
        render(<RecipeDetails name={name} recipe={recipe} />)

        expect(screen.getByText(recipe.name)).toBeInTheDocument()
        expect(screen.getByText(recipe.difficulty)).toBeInTheDocument()
        expect(screen.getByText(recipe.duration)).toBeInTheDocument()
        expect(screen.getByRole('img')).toBeInTheDocument()

    })

    test('verificando a funcionalidade esconde e mostra mais detalhes', async () => {
        const user = userEvent.setup()
        render(<RecipeDetails name={name} recipe={recipe} />)

        expect(screen.queryByLabelText('show more')).not.toBeNull()

        const button = screen.getByLabelText('show more')

        expect(screen.queryByText('Ingredientes')).toBeNull()
        expect(screen.queryByText(recipe.preparation)).toBeNull()

        await user.click(button)

        expect(screen.getByText('Ingredientes')).toBeInTheDocument()
        expect(screen.getByText(recipe.preparation)).toBeInTheDocument()

    })
})