import { render, screen, waitFor, } from '@testing-library/react'
import '@testing-library/jest-dom'
import RecipePresentation from '../../components/RecipePage/RecipePresentation'
import fakeMock from '../testHandler/fakeMock'


const recipe = fakeMock.recipe
describe('<recipePresentation />', () => {

    test('Apresentação da receita', () => {
        render(<RecipePresentation recipe={recipe} />)

        expect(screen.getByText(recipe.name)).toBeInTheDocument()
        expect(screen.getByText(recipe.difficulty)).toBeInTheDocument()
        expect(screen.getByText(recipe.duration)).toBeInTheDocument()
        expect(screen.getByText('compra massa pre-pronta, pois e mais facil')).toBeInTheDocument()
        expect(screen.getByText('ovos')).toBeInTheDocument()
        expect(screen.getByText('cenoura')).toBeInTheDocument()
        expect(screen.getByText('trigo')).toBeInTheDocument()
        expect(screen.getByText('leite')).toBeInTheDocument()
        expect(screen.getByText('agua')).toBeInTheDocument()
    })

})