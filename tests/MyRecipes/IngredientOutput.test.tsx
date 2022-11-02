import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Ingredients from '../../components/MyRecipes/Ingredients'

describe('<Ingredients />', () => {

    test('Output/saida da informação lista de ingredient', () => {
        render(<Ingredients recipe={{ ingredient: ['agua', 'leite', 'trigo', 'aveia', 'banana'] }} />)

        expect(screen.getByText('agua')).toBeInTheDocument()
        expect(screen.getByText('leite')).toBeInTheDocument()
        expect(screen.getByText('trigo')).toBeInTheDocument()
        expect(screen.getByText('aveia')).toBeInTheDocument()
        expect(screen.getByText('banana')).toBeInTheDocument()
    })

})