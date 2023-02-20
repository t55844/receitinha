import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

interface IActionAreaCard {
    alt: string
    img: string
    title: string
    description: string
    linkTo: string
}

export default function ActionAreaCard(props: IActionAreaCard) {
    return (
        <Card
            sx={{ width: '100%', margin: '0.5rem auto' }}>
            <CardMedia
                sx={{ height: '9rem' }}
                component="img"
                image={props.img}
                alt={props.alt}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
            </CardContent>
            <Link
                sx={{ margin: '0 1rem' }}
                component="button"
                variant="button"
                color="primary"
                underline='none'
                href={props.linkTo}
            >
                Ver Receitas
            </Link>
        </Card>
    );
}
