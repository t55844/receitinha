import { render, screen, waitFor, } from '@testing-library/react'
import '@testing-library/jest-dom'
import RecipePresentation from '../../components/RecipePage/RecipePresentation'

const recipe = {
    id: 3,
    name: "bolo de cenoura",
    difficulty: "Simples",
    duration: "20 minutos",
    preparation: "compra massa pre-pronta, pois e mais facil",
    email: "guto22@yahoo.com",
    ingredient: [, "agua", "leite", "trigo", "cenoura", "ovos"],
    img: "blob:http://localhost:3000/cfe3e0f2-d8f6-405b-b11d-400e99ffb92e",
}
describe('<recipePresentation />', () => {

    test('Apresentação da receita', async () => {
        render(
            <RecipePresentation recipe={recipe} />
        )

        expect(screen.getByText('bolo de cenoura')).toBeInTheDocument()
        expect(screen.getByText('Simples')).toBeInTheDocument()
        expect(screen.getByText('20 minutos')).toBeInTheDocument()
        expect(screen.getByText('compra massa pre-pronta, pois e mais facil')).toBeInTheDocument()
        expect(screen.getByText('ovos')).toBeInTheDocument()
        expect(screen.getByText('cenoura')).toBeInTheDocument()
        expect(screen.getByText('trigo')).toBeInTheDocument()
        expect(screen.getByText('leite')).toBeInTheDocument()
        expect(screen.getByText('agua')).toBeInTheDocument()
    })

})