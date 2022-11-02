import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import IngredientInput from '../../components/MyRecipes/IngredientInput'

describe('<IngredientInput />', () => {
    test('Input/entrada da informação lista de ingredientes', async () => {
        const user = userEvent.setup()
        render(<IngredientInput />)

        const field = screen.getAllByLabelText('Descreva o ingrediente')

        await user.type(field[0], 'leite em pó')

        expect(screen.getByText('leite em pó'))
    })
})