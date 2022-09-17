import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Link } from '@mui/material';

export default function CardMyReipes() {
    return (
        <Card sx={{ width: '80%', margin: '0 auto' }}>
            <CardMedia
                sx={{ height: '100%' }}
                component="img"
                image="https://img.freepik.com/fotos-premium/retrato-da-cintura-para-cima-de-um-grupo-diversificado-de-pessoas-cozinhando-juntas-durante-o-workshop-em-uma-cozinha-profissional_236854-35219.jpg?w=2000"
                alt="amigos cozinhando"
            />
            <CardContent sx={{ width: '70%', margin: '0 auto' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Envie suas proprias receitas
                </Typography>
                <Typography variant="subtitle1" color="">
                    Caso você tenha alguma receita da vovó, da irma ou ate mesmo gostaria de compartilhar uma versão sua de alguma receita, então no envie e ela aparecera no cite para outras pessoas verem e comentarem
                </Typography>
            </CardContent>
            <Link
                sx={{ margin: '0 40%', border: `2px solid`, padding: '5px' }}
                component="button"
                variant="button"
                color="primary"
                underline='none'
                href='/minhasReceitas'
            >
                Envienos sua Receita
            </Link>
        </Card>
    );
}
