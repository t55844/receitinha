import React from 'react'
import { Typography } from '@mui/material';
import TimerSharpIcon from '@mui/icons-material/TimerSharp';
import IngredientList from './IngredientList';
import { colors } from '../MaterialUI/theme';
import { CldImage } from 'next-cloudinary';
import { IRecipeDB } from '../../js/interface_and_ultils/interface';
import Image from 'next/image';
import NotLoggedModal from './NotLoggedModal';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import Chip from '@mui/material/Chip';

function RecipePresentation(props: { recipe: IRecipeDB }) {
    const { recipe } = props
    const [like, setLike] = React.useState<number>(recipe.Likes?.length | 0);

    return (
        <div style={{ width: '100%', margin: '2.5% auto', display: 'flex', flexDirection: 'column', alignItems: 'center', background: colors.opacity, borderBottom: `3px solid ${colors.primary}` }}>
            <Typography variant='h4' sx={{ margin: '4%', borderBottom: `3px solid ${colors.primary}` }}>
                {recipe.name}
            </Typography>
            {recipe.img.split('').slice(-4).join('') === '.jpg' ?
                <Image src={recipe.img} width='600px' height='400px' /> :
                <CldImage src={recipe.img} width='600px' height='400px' />
            }

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '4%', borderBottom: `3px solid ${colors.primary}` }}>

                <Typography data-testid='diffculty' variant='h6' component='p'>{recipe.diffculty}</Typography>

                <Chip icon={<AddReactionOutlinedIcon />} color='primary' sx={{ color: 'black' }} label={like} variant="outlined" />

                <Typography variant='h6' component='p'><TimerSharpIcon color='primary' /> {recipe.duration}</Typography>
            </div>

            <IngredientList ingredient={recipe.ingredients} />

            <div style={{ width: '80%', margin: '4% 0', borderBottom: `3px solid ${colors.primary}` }}>
                <Typography variant='h6'>Preparo</Typography>
                <Typography>{recipe.preparation}</Typography>
            </div>
            <NotLoggedModal setLike={setLike} />
        </div >
    )
}

export default (RecipePresentation)