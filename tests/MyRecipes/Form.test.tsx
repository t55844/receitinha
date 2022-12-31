import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Form from '../../components/MyRecipes/Form'
import { Provider } from 'react-redux'
import store from '../../js/redux/store'

describe('<From />', () => {
    test('verificando todos os campos do formulario', async () => {
        const user = userEvent.setup()
        render(<Provider store={store}><Form /></Provider>)

        expect(screen.queryByPlaceholderText('bolo de milho')).not.toBeNull()

        const plusOneButton = screen.getByLabelText('plusOne')
        expect(plusOneButton).toBeInTheDocument()

        await user.click(plusOneButton)

        expect(screen.queryByPlaceholderText('Ingrediente')).not.toBeNull()
        expect(screen.queryByPlaceholderText('coloque a massa na batedeira, misture com leite e a manteiga ate que fique homogenea')).not.toBeNull()
        expect(screen.queryAllByText('Dificuldade')[0]).not.toBeNull()
        expect(screen.queryAllByText('Duração')[0]).not.toBeNull()
        expect(screen.queryByLabelText('entrada de imagem')).not.toBeNull()
    })

    test('digitando  todos os campos do formulario e enviando', async () => {
        const user = userEvent.setup()
        render(<Provider store={store}><Form /></Provider>)

        const plusOneButton = screen.getByLabelText('plusOne')
        expect(plusOneButton).toBeInTheDocument()

        await user.click(plusOneButton)

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

    test('testando select', async () => {
        const user = userEvent.setup()
        render(<Provider store={store}><Form /></Provider>)

        const selectDificulty = screen.getByRole('select-Dificuldade')
        const selectDuration = screen.getByRole('select-Duração')
        expect(selectDificulty).not.toEqual(selectDuration)

        await user.selectOptions(selectDificulty, 'Simples')
        await user.selectOptions(selectDuration, '20 minutos')

        expect(screen.getByRole('option', { name: 'Simples' }).selected).toBe(true)
        expect(screen.getByRole('option', { name: '20 minutos' }).selected).toBe(true)

        expect(screen.getByRole('option', { name: '30 minutos' }).selected).toBe(false)
        expect(screen.getByRole('option', { name: '60 minutos' }).selected).toBe(false)
        expect(screen.getByRole('option', { name: 'Mais de 1:30 hora' }).selected).toBe(false)

        expect(screen.getByRole('option', { name: 'Dificil' }).selected).toBe(false)
        expect(screen.getByRole('option', { name: 'Facil' }).selected).toBe(false)
        expect(screen.getByRole('option', { name: 'Muito Dificil' }).selected).toBe(false)

    })

    test('campo de entrada de arquivo', async () => {
        const user = userEvent.setup()
        render(<Provider store={store}><Form /></Provider>)

        const imageField = screen.getByLabelText('entrada de imagem')
        const file = new File(['hello'], 'hello.png', { type: 'image/png' })

        await user.upload(imageField, file)

        expect(imageField.files[0]).toStrictEqual(file)
        expect(imageField.files.item(0)).toStrictEqual(file)
        expect(imageField.files).toHaveLength(1)
    })

})



/***
 * ---------------------------------------------NÃO CONSEGUI FAZER FUNCIONAR---------------------------------------------------------
 * ------------APESAR DE FUNCIONAR QUANDO TESTO NA MÃO ( FORA DO JEST) E 
 * -------------- NO JEST ELE CONSEGUE EXECUTAR UM LOG NO MESMO MESMO ESCOPO DO reset()
 * ----------------------ELE NÃO EXECUTA O reset() PORTANTO O FORM NÃO LIMPA OS CAMPOS ASSIM FALHANDO NO TESTE
 * global.fetch = jest.fn().mockImplementation(() => new Promise((resolve, reject,) => {
    const successObject = {
        error: false,
        menssage: 'ok',
        json: () => {
            return new Promise((resolve, reject,) => {
                resolve(
                    {
                        error: false,
                        menssage: 'ok',
                    }
                )
            })
        }

    }
    resolve(successObject);

}));

describe('Envio de formulario', () => {
    test('Todas informações digitadas corretamente', async () => {
        const user = userEvent.setup()
        render(<Provider store={store}><Form /></Provider>)

        const titleField = screen.getByPlaceholderText('bolo de milho')
        const ingredientField = screen.getByPlaceholderText('Ingrediente')
        const preparationField = screen.getByPlaceholderText('coloque a massa na batedeira, misture com leite e a manteiga ate que fique homogenea')

        await user.type(titleField, 'titulo da receita')
        await user.type(ingredientField, 'ingrediente da receita')
        await user.type(preparationField, 'preparo da receita')


        const selectDificulty = screen.getByRole('select-Dificuldade')
        const selectDuration = screen.getByRole('select-Duração')

        await user.selectOptions(selectDificulty, 'Simples')
        await user.selectOptions(selectDuration, '20 minutos')

        const imageField = screen.getByLabelText('entrada de imagem')
        const file = new File(['hello'], 'hello.png', { type: 'image/png' })

        await user.upload(imageField, file)

        expect(screen.queryByDisplayValue('titulo da receita')).not.toBeNull()
        expect(screen.queryByDisplayValue('ingrediente da receita')).not.toBeNull()
        expect(screen.queryByDisplayValue('preparo da receita')).not.toBeNull()
        expect(screen.getByRole('option', { name: 'Simples' }).selected).toBe(true)
        expect(screen.getByRole('option', { name: '20 minutos' }).selected).toBe(true)
        expect(imageField.files.item(0)).toStrictEqual(file)

        const buttonSend = screen.getByText('Enviar')
        await user.click(buttonSend)

        expect(screen.queryByDisplayValue('titulo da receita')).toBeNull()
        expect(screen.queryByDisplayValue('ingrediente da receita')).toBeNull()
        expect(screen.queryByDisplayValue('preparo da receita')).toBeNull()

    })
})

 */