import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import sectionHome from '../../styles/home/sectionsHome.module.css'

import { Typography } from '@mui/material';
import { colors } from '../MaterialUI/theme';
export default function RecipesList() {
    return (
        <div className={sectionHome.listRecipes} style={{ backgroundColor: colors.primaryLigth }}>
            <Typography variant='h5'
                sx={{ margin: "2rem" }} >
                Algumas receitas que podem te interessar
            </Typography>
            <ImageList sx={{ width: '80%', height: '50rem', margin: '0 auto' }}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={item.author}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.title}`}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

const itemData = [
    {
        img: 'https://tartanero.com.br/site/wp-content/uploads/2021/03/bolos-24.jpg',
        title: 'tartanero',
        author: '@bkristastucchio',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://cdn0.casamentos.com.br/vendor/4044/3_2/960/jpg/bolo-de-chocolate-de-camada-dupla.jpeg',
        title: 'Bolo de chocolate',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://files.nsctotal.com.br/s3fs-public/styles/paragraph_image_style/public/graphql-upload-files/bolo%20de%20cenoura.jpg?cemBkh2BVCp7FG8PruK3ONYzSffgtgBK&itok=MMIRRc-T',
        title: 'Cenoura e chocolate',
        author: '@helloimnik',
    },
    {
        img: 'https://static.clubedaanamariabraga.com.br/wp-content/uploads/2020/08/pizza-margherita.jpg?x41527',
        title: 'Pizza de Margerita',
        author: '@nolanissac',
        cols: 2,
    },
    {
        img: 'https://www.receiteria.com.br/wp-content/uploads/massa-de-pizza-sem-gluten-00.jpg',
        title: 'Massa de pizza sem glúten',
        author: '@hjrc33',
        cols: 2,
    },
    {
        img: 'https://img.itdg.com.br/tdg/images/blog/uploads/2019/03/arroz-de-forno-super-rapido.jpg?w=1200',
        title: 'Almoço bonito e rapido',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://coolicias.ao/wp-content/uploads/2019/11/Almo%C3%A7o-R%C3%A1pido-de-Estrogonofe-de-Carne-com-Cenoura.jpg',
        title: 'Simples mas delicioso',
        author: '@tjdragotta',
    },
    {
        img: 'https://claudia.abril.com.br/wp-content/uploads/2020/01/penne-ao-molho-de-espinafre-com-tomate-seco.jpg',
        title: 'Macarrão sempre cai bem',
        author: '@katie_wasserman',
    },
];
