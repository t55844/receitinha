import * as React from 'react';

import mainStyle from '../../styles/menu/main.module.css'
import ActionAreaCard from './ActionAreaCard';


export default function Main(props) {
    return (
        <main className={mainStyle.container}>
            <div className={mainStyle.cardEmphasis}>
                <ActionAreaCard
                    linkTo='/doces'
                    title="Doces"
                    description="Bolos e doces deliciosos para você e sua familha"
                    alt='Bolos e doces'
                    img="https://portaldafestacuritiba.com.br/wp-content/uploads/2020/04/Logo-Docinhos-e-Cia.jpg" />
            </div>
            <div className={mainStyle.card}>
                <ActionAreaCard
                    linkTo='/pizzas'
                    title="Pizzas"
                    description="Combinações de recheio e bordas para pizzas incriveis"
                    alt='pizzas de varios sabores'
                    img="https://www.emporiotambo.com.br/pub/media/resized/1300x800/ves/blog/xsabores-de-pizza.jpeg.pagespeed.ic.Aok6EiErup.jpg" />
            </div>
            <div className={mainStyle.card}>
                <ActionAreaCard
                    linkTo='/pratos'
                    title="Pratos"
                    description="Pratos incriveis para almoços de fim de semana e féstas comemorativas"
                    alt='pratos de feijoada e arroz'
                    img="https://menutrip.com.br/wp-content/uploads/2017/05/image7-649x432.jpg" />
            </div>
            <div className={mainStyle.cardEmphasis}>
                <ActionAreaCard
                    linkTo='/receitas'
                    title="Receitas"
                    description="Se quiser ver outras receitas"
                    alt="Livro de receitas"
                    img="https://img.elo7.com.br/product/original/1F6ACCE/caderno-de-receitas-receitas.jpg" />
            </div>
        </main>
    );
}
