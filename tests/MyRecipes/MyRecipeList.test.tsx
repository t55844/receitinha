import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import fakeMock from '../testHandler/fakeMock'
import { Provider } from 'react-redux'
import MyRecipeList from '../../components/MyRecipes/MyRecipeList'


global.fetch = fakeMock.fakeFetch
global.URL = fakeMock.fakeURL
const store = fakeMock.fakeStore
const recipe = fakeMock.recipe

describe('<MyRecipeList />', () => {
    test('testando seta mais informações ( \\/ ) ou seta dropdown', async () => {
        const user = userEvent.setup()
        render(<Provider store={store}><MyRecipeList /></Provider>)

        expect(screen.getByText('bolo')).toBeInTheDocument()
        expect(screen.getByText('Simples')).toBeInTheDocument()
        expect(screen.getByText('20 minutos')).toBeInTheDocument()

        expect(screen.queryByText('Ingredientes')).toBeNull()
        expect(screen.queryByText('agua')).toBeNull()
        expect(screen.queryByText('leite')).toBeNull()
        expect(screen.queryByText('trigo')).toBeNull()
        expect(screen.queryByText('cenoura')).toBeNull()
        expect(screen.queryByText('ovos')).toBeNull()
        expect(screen.queryByText('Como Fazer')).toBeNull()
        expect(screen.queryByText('compra massa pre-pronta, pois e mais facil')).toBeNull()

        await user.click(screen.getByTestId("ExpandMoreIcon"))

        expect(screen.getByText('Ingredientes')).toBeInTheDocument()
        expect(screen.getByText('agua')).toBeInTheDocument()
        expect(screen.getByText('leite')).toBeInTheDocument()
        expect(screen.getByText('trigo')).toBeInTheDocument()
        expect(screen.getByText('cenoura')).toBeInTheDocument()
        expect(screen.getByText('ovos')).toBeInTheDocument()
        expect(screen.getByText('Como Fazer')).toBeInTheDocument()
        expect(screen.getByText('compra massa pre-pronta, pois e mais facil')).toBeInTheDocument()

    })
})