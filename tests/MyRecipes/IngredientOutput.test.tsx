import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Ingredients from '../../components/MyRecipes/Ingredients'

describe('<Ingredients />', () => {

    test('Output/saida da informação lista de ingredient', () => {
        render(<Ingredients recipe={{
            id: 2,
            name: 'bolo',
            difficulty: 'Facil',
            duration: '30 minutos',
            preparation: 'compra massa pre-pronta, pois e mais facil',
            email: 'guto22@yahoo.com',
            ingredients: [{ ingredient: 'agua' }, { ingredient: 'leite' }, { ingredient: 'trigo' }, { ingredient: 'aveia' }, { ingredient: 'banana' }]
        }} />)

        expect(screen.getByText('agua')).toBeInTheDocument()
        expect(screen.getByText('leite')).toBeInTheDocument()
        expect(screen.getByText('trigo')).toBeInTheDocument()
        expect(screen.getByText('aveia')).toBeInTheDocument()
        expect(screen.getByText('banana')).toBeInTheDocument()
    })

})