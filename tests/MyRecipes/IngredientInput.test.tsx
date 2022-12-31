import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Form from '../../components/MyRecipes/Form'
import { Provider } from 'react-redux'
import store from '../../js/redux/store'


describe('<IngredientInput />', () => {
    test('Input/entrada da informação lista de ingredientes', async () => {
        const user = userEvent.setup()
        render(<Provider store={store}><Form /></Provider>)

        const plusOneButton = screen.getByLabelText('plusOne')
        await user.click(plusOneButton)

        const field = screen.getAllByPlaceholderText('Ingrediente')
        expect(field[0]).toBeInTheDocument()

        expect(screen.queryByDisplayValue('leite em pó')).toBeNull()
        await user.type(field[0], 'leite em pó')
        expect(screen.queryByDisplayValue('leite em pó')).not.toBeNull()
    })

    test('<IngredientInput /> funcionalidade de adicionar um campo(plusOne) e digitar nele', async () => {
        const user = userEvent.setup()
        render(<Provider store={store}><Form /></Provider>)

        const plusOneButton = screen.getByLabelText('plusOne')
        expect(plusOneButton).toBeInTheDocument()

        await user.click(plusOneButton)
        await user.click(plusOneButton)
        const twoField = screen.getAllByPlaceholderText('Ingrediente')
        expect(twoField.length).toBeGreaterThan(1)

        expect(screen.queryByDisplayValue('segundo campo')).toBeNull()
        expect(screen.queryByDisplayValue('primeiro campo')).toBeNull()

        await user.type(twoField[0], 'primeiro campo')
        await user.type(twoField[1], 'segundo campo')

        expect(screen.queryByDisplayValue('segundo campo')).not.toBeNull()
        expect(screen.queryByDisplayValue('primeiro campo')).not.toBeNull()

    })

    test('<IngredientInput /> funcionalidade de excluir um campo(botao lixeirinha)', async () => {
        const user = userEvent.setup()
        render(<Provider store={store}><Form /></Provider>)

        const plusOneButton = screen.getByLabelText('plusOne')
        expect(plusOneButton).toBeInTheDocument()

        await user.click(plusOneButton)
        await user.click(plusOneButton)
        await user.click(plusOneButton)
        const twoField = screen.getAllByPlaceholderText('Ingrediente')
        expect(twoField.length).toBeGreaterThan(1)

        expect(screen.queryByDisplayValue('primeiro campo')).toBeNull()
        expect(screen.queryByDisplayValue('segundo campo')).toBeNull()
        expect(screen.queryByDisplayValue('terceiro campo')).toBeNull()

        await user.type(twoField[0], 'primeiro campo')
        await user.type(twoField[1], 'segundo campo')
        await user.type(twoField[2], 'terceiro campo')

        expect(screen.queryByDisplayValue('primeiro campo')).not.toBeNull()
        expect(screen.queryByDisplayValue('segundo campo')).not.toBeNull()
        expect(screen.queryByDisplayValue('terceiro campo')).not.toBeNull()

        const deleteButtonSegundoCampo = screen.getAllByLabelText('delete')[1]
        expect(deleteButtonSegundoCampo).toBeInTheDocument()

        await user.click(deleteButtonSegundoCampo)
        expect(screen.queryByDisplayValue('segundo campo')).toBeNull()
        expect(screen.queryByDisplayValue('terceiro campo')).not.toBeNull()

    })

})
