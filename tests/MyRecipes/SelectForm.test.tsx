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
        render(<SelectForm label='select' options={['Simples', 'Facil', 'Dificil', 'Muito dificil']} />)

        const select = screen.getByLabelText('select')

        expect(screen.queryByText('Simples')).not.toBeInTheDocument()
        expect(screen.queryByText('Muito dificil')).not.toBeInTheDocument()
        expect(screen.queryByText('Dificil')).not.toBeInTheDocument()
        expect(screen.queryByText('Facil')).not.toBeInTheDocument()

        await user.click(select)

        expect(screen.queryByText('Simples')).toBeInTheDocument()
        expect(screen.queryByText('Muito dificil')).toBeInTheDocument()
        expect(screen.queryByText('Dificil')).toBeInTheDocument()
        expect(screen.queryByText('Facil')).toBeInTheDocument()

    })
})