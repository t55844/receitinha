import configureStore from 'redux-mock-store'


const fakeURL = {
    createObjectURL: (blob) => "C:\Users\Usuário\OneDrive\Área de Trabalho\miniProjetos\minha_receita\public\imagem_para_testes.jpg"
}

var blob = new Blob(["QzpcVXNlcnNcVXN1w6FyaW9cT25lRHJpdmVcw4FyZWEgZGUgVHJhYmFsaG9cbWluaVByb2pldG9zXG1pbmhhX3JlY2VpdGFccHVibGljXGltYWdlbV9wYXJhX3Rlc3Rlcy5qcGc="], { type: 'text/html' });
blob["lastModifiedDate"] = "";
blob["name"] = "filename";
const fakeBlob = blob;

const recipe = {
    id: 2,
    name: 'bolo',
    diffculty: 'Simples',
    duration: '20 minutos',
    preparation: 'compra massa pre-pronta, pois e mais facil',
    email: 'guto22@yahoo.com',
    ingredients: [{ ingredient: 'agua' }, { ingredient: 'leite' }, { ingredient: 'trigo' }, { ingredient: 'cenoura' }, { ingredient: 'ovos' }],
    img: "i0kolhndjjchhdafjheq"
}

const fakeFetch = jest.fn().mockImplementation(() => new Promise((resolve, reject,) => {
    resolve({
        error: false,
        payload: [
            {
                recipeId: 3,
                name: 'Joao',
                email: 'j22@ot.com',
                text: 'muito bom'
            }
        ],
        blob: () => fakeBlob,
        json: () => {
            return {
                error: false,
                payload: [
                    {
                        recipe
                    }
                ]
            }
        }
    })

}));

const initialState = {
    recipe,
    recipePage: recipe,
    user: {
        value: {
            email: 'guto22@yahoo.com.br'
        }
    },
    user: {
        value: {
            name: 'beto',
            email: 'beto22@beto.com'
        }
    },
    fetch: {
        recipesReq: {
            loading: false,
            failed: false,
            data: [
                recipe
            ]
        },
    }
};
const mockStore = configureStore();

const fakeStore = mockStore(initialState)

export default {
    fakeFetch,
    fakeStore,
    fakeURL,
    recipe
}