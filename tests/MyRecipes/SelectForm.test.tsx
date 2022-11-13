import { render, screen } from '@testing-library/react'
import SelectForm from "../../components/MyRecipes/SelectForm";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('<SelectFrom />', () => {
    test('Existe select', () => {
        render(<SelectForm label='select' options={['Simples', 'Facil', 'Dificil', 'Muito dificil']} />)

        const select = screen.getByLabelText('select')

        expect(select).toBeInTheDocument()

    })
    test('Seleciona opções', async () => {
        const user = userEvent.setup()
        render(<SelectForm selectOption={console.log} label='select' options={['Simples', 'Facil', 'Dificil', 'Muito Dificil']} />)

        const select = screen.getByLabelText('select')

        await user.selectOptions(select, ['Simples'])
        expect(screen.getByRole('option', { name: 'Simples' }).selected).toBe(true)
        expect(screen.getByRole('option', { name: 'Dificil' }).selected).toBe(false)
        expect(screen.getByRole('option', { name: 'Facil' }).selected).toBe(false)
        expect(screen.getByRole('option', { name: 'Muito Dificil' }).selected).toBe(false)

        await user.selectOptions(select, ['Muito Dificil'])
        expect(screen.getByRole('option', { name: 'Simples' }).selected).toBe(false)
        expect(screen.getByRole('option', { name: 'Dificil' }).selected).toBe(false)
        expect(screen.getByRole('option', { name: 'Facil' }).selected).toBe(false)
        expect(screen.getByRole('option', { name: 'Muito Dificil' }).selected).toBe(true)

    })
})