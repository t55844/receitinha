import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import { colors } from '../MaterialUI/theme';
import myRecipes from '../../styles/home/sectionsHome.module.css'

export default function CardMyReipes() {
    return (
        <div className={myRecipes.containerCard} style={{ backgroundColor: colors.primaryLigth }}>
            <CardMedia
                sx={{ height: '100%', width: "70%", margin: '0  auto' }}
                component="img"
                image="https://img.freepik.com/fotos-premium/retrato-da-cintura-para-cima-de-um-grupo-diversificado-de-pessoas-cozinhando-juntas-durante-o-workshop-em-uma-cozinha-profissional_236854-35219.jpg?w=2000"
                alt="amigos cozinhando"
            />
            <CardContent sx={{ margin: '0 auto' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Envie-nos suas proprias receitas
                </Typography>
                <Typography variant="subtitle1" color="">
                    Caso você tenha alguma receita da vovó, da irma ou ate mesmo gostaria de compartilhar uma versão sua de alguma receita, então no envie e ela aparecera, para que outras pessoas verem e comentarem
                </Typography>
                <Link
                    sx={{ margin: "1rem 0", border: `2px solid`, padding: '5px' }}
                    component="button"
                    variant="button"
                    color="primary"
                    underline='none'
                    href='/minhasReceitas'
                >
                    Envienos sua Receita
                </Link>
            </CardContent>
        </div>
    );
}
