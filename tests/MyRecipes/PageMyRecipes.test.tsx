import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import PageMyRecipes from "../../components/MyRecipes/PageMyRecipes"

describe('<PageMyRecipes />', () => {

    test('Titulo das abas', () => {

        render(<PageMyRecipes />)



        expect(screen.queryByLabelText('tabs box')).not.toBeNull

    })
})