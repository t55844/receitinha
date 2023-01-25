

const data = [
    {
        id: 3,
        name: 'bolo de cenoura',
        difficulty: 'Simples',
        duration: '20 minutos',
        preparation: 'compra massa pre-pronta, pois e mais facil',
        email: 'guto22@yahoo.com',
        ingredients: [{ ingredient: 'agua' }, { ingredient: 'leite' }, { ingredient: 'trigo' }, { ingredient: 'cenoura' }, { ingredient: 'ovos' }]
    },
    {
        id: 1,
        name: 'bolo bana aveia',
        difficulty: 'Dificil',
        duration: '60 minutos',
        preparation: 'compra massa pre-pronta, pois e mais facil',
        email: 'guto22@yahoo.com',
        ingredients: [{ ingredient: 'agua' }, { ingredient: 'leite' }, { ingredient: 'trigo' }, { ingredient: 'aveia' }, { ingredient: 'banana' }, { ingredient: 'trigo' }, { ingredient: 'manteiga' }]
    },
    {
        id: 2,
        name: 'bolo',
        difficulty: 'Facil',
        duration: '30 minutos',
        preparation: 'compra massa pre-pronta, pois e mais facil',
        email: 'guto22@yahoo.com',
        ingredients: [{ ingredient: 'agua' }, { ingredient: 'leite' }, { ingredient: 'trigo' }, { ingredient: 'aveia' }, { ingredient: 'banana' }]
    },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        return res.status(200).json({ error: false, msg: 'success', data })
    } else {
        return res.status(400).json({ error: true, msg: 'Bad Request' })
    }

}