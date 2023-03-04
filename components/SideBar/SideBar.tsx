import * as React from 'react';
import { Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import mainStyle from '../../styles/home/main.module.css'

import { colors } from '../MaterialUI/theme';
import Image from 'next/future/image';
import { CldImage } from 'next-cloudinary';


export interface IRecipesToSideBar {

    name: string
    img: string
    comments: { text: string }[]
    Users: { name: string, id: number }

}


export default function SideBar(props: { recipes: IRecipesToSideBar[] }) {
    const [recipesToShow, setRecipesToShow] = React.useState<IRecipesToSideBar[]>([]);
    const recipes = props.recipes


    React.useEffect(() => {

        setRecipesToShow(recipes)
    }, [])

    return (
        <div data-aos="fade-left" className={mainStyle.sidebar} style={{ borderColor: `${colors.primary}`, width: "150rem" }}>
            <Typography
                variant='h6'
            >
                Receitas mais Vistas
            </Typography >
            <ImageList sx={{ display: "flex", flexDirection: 'column', height: '80rem' }}>
                {recipesToShow.map((item) => (
                    <ImageListItem
                        sx={{ width: '100%' }}
                        key={item.img}>
                        {
                            item.img.split('').slice(-4).join('') === '.jpg' ?
                                < Image style={{ background: 'white', padding: '18px' }} alt={'imagem da receita'} src={item.img} width={175} height={125} /> :
                                <CldImage src={item.img} width={175} height={125} />
                        }
                        <ImageListItemBar
                            title={'Feito por: ' + item.Users.name}
                            subtitle={<span>comentario: {item.comments[0] ? item.comments[0].text : ''}</span>}
                            position="below"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div >
    );
}

