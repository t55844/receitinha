import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Form from '../../components/MyRecipes/Form'


describe('<From />', () => {
    test('verificando todos os campos do formulario', () => {
        render(<Form />)

        expect(screen.queryByPlaceholderText('bolo de milho')).not.toBeNull()
        expect(screen.queryByPlaceholderText('Ingrediente')).not.toBeNull()
        expect(screen.queryByPlaceholderText('coloque a massa na batedeira, misture com leite e a manteiga ate que fique homogenea')).not.toBeNull()
        expect(screen.queryByPlaceholderText('Simples')).not.toBeNull()
        expect(screen.queryByPlaceholderText('20 minutos')).not.toBeNull()
        expect(screen.queryByLabelText('entrada de imagem')).not.toBeNull()
    })

    test('digitando  todos os campos do formulario e enviando', async () => {
        const user = userEvent.setup()
        render(<Form />)

        const titleField = screen.getByPlaceholderText('bolo de milho')
        const ingredientField = screen.getByPlaceholderText('Ingrediente')
        const preparationField = screen.getByPlaceholderText('coloque a massa na batedeira, misture com leite e a manteiga ate que fique homogenea')

        expect(screen.queryByDisplayValue('titulo da receita')).toBeNull()
        expect(screen.queryByDisplayValue('ingrediente da receita')).toBeNull()
        expect(screen.queryByDisplayValue('preparo da receita')).toBeNull()

        await user.type(titleField, 'titulo da receita')
        await user.type(ingredientField, 'ingrediente da receita')
        await user.type(preparationField, 'preparo da receita')

        expect(screen.queryByDisplayValue('titulo da receita')).not.toBeNull()
        expect(screen.queryByDisplayValue('ingrediente da receita')).not.toBeNull()
        expect(screen.queryByDisplayValue('preparo da receita')).not.toBeNull()

    })

    test('campo de entrada de arquivo', async () => {
        const user = userEvent.setup()
        render(<Form />)

        const imageField = screen.getByLabelText('entrada de imagem')
        const file = new File(['hello'], 'hello.png', { type: 'image/png' })

        await user.upload(imageField, file)

        expect(imageField.files[0]).toStrictEqual(file)
        expect(imageField.files.item(0)).toStrictEqual(file)
        expect(imageField.files).toHaveLength(1)
    })

})

describe('<IngredientInput />', () => {
    test('Input/entrada da informação lista de ingredientes', async () => {
        const user = userEvent.setup()
        render(<Form />)

        const field = screen.getAllByLabelText('Descreva o ingrediente')
        expect(field[0]).toBeInTheDocument()

        expect(screen.queryByDisplayValue('leite em pó')).toBeNull()
        await user.type(field[0], 'leite em pó')
        expect(screen.queryByDisplayValue('leite em pó')).not.toBeNull()
    })

    test('<IngredientInput /> funcionalidade de adicionar um campo(plusOne) e digitar nele', async () => {
        const user = userEvent.setup()
        render(<Form />)

        const field = screen.getAllByPlaceholderText('Ingrediente')
        expect(field.length).not.toBeGreaterThan(1)
        expect(field[0]).toBeInTheDocument()

        const plusOneButton = screen.getByLabelText('plusOne')
        expect(plusOneButton).toBeInTheDocument()

        await user.click(plusOneButton)
        const twoField = screen.getAllByPlaceholderText('Ingrediente')
        expect(twoField.length).toBeGreaterThan(1)

        expect(screen.queryByDisplayValue('segundo campo')).toBeNull()
        expect(screen.queryByDisplayValue('primeiro campo')).toBeNull()

        await user.type(twoField[1], 'segundo campo')
        await user.type(field[0], 'primeiro campo')

        expect(screen.queryByDisplayValue('segundo campo')).not.toBeNull()
        expect(screen.queryByDisplayValue('primeiro campo')).not.toBeNull()

    })

    test('<IngredientInput /> funcionalidade de excluir um campo(botao lixeirinha)', async () => {
        const user = userEvent.setup()
        render(<Form />)

        const plusOneButton = screen.getByLabelText('plusOne')
        expect(plusOneButton).toBeInTheDocument()

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

        const deleteButtonSegundoCampo = screen.getAllByLabelText('delete')[0]
        expect(deleteButtonSegundoCampo).toBeInTheDocument()

        await user.click(deleteButtonSegundoCampo)
        expect(screen.queryByDisplayValue('segundo campo')).toBeNull()
        expect(screen.queryByDisplayValue('terceiro campo')).not.toBeNull()

    })

})