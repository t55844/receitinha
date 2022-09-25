import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from '../../components/MyRecipes/Form'
describe('form', () => {
    it('form', () => {
        render(<Form />)

        expect(screen.getByTitle('submit-button')).toBeInTheDocument()
        expect(screen.getByLabelText('Quanto tempo leva')).toBeInTheDocument()
        expect(screen.getByLabelText('Diga a dificuldade')).toBeInTheDocument()
        expect(screen.getByLabelText('Explique o modo de preparo')).toBeInTheDocument()
        expect(screen.getByLabelText('Descreva o ingrediente')).toBeInTheDocument()
        expect(screen.getByLabelText('O nome da receita')).toBeInTheDocument()

    })
})