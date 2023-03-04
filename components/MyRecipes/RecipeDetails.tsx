import * as React from 'react';
import { styled } from '@mui/material/styles';
import { NextRouter, useRouter } from 'next/router';
import { IRecipeDB } from '../../js/interface_and_ultils/interface';
import { useDispatch } from 'react-redux';
import { recipeToCurrentPage } from '../../js/redux/reduxSlice/recipePageSlice';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Ingredients from './Ingredients';
import Button from '@mui/material/Button';
import { CldImage } from 'next-cloudinary';
import { Dispatch } from 'redux';
import Image from 'next/image';



interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeDetails(props: { recipe: IRecipeDB }) {
    const recipe = props.recipe
    const [expanded, setExpanded] = React.useState<boolean>(false);

    const router: NextRouter = useRouter()
    const dispatch: Dispatch = useDispatch()

    const handleExpandClick = (currentName: string) => {
        if (recipe.name === currentName) {
            setExpanded(!expanded);
        }
    };

    return (
        <div >
            <Card sx={{ width: '100%', maxWidth: '300px' }}>
                <CardHeader
                    action={
                        <Typography variant='body1' >
                            <Button
                                onClick={() => {
                                    dispatch(recipeToCurrentPage(recipe));
                                    router.push(`/recipePages/${recipe.id}`)
                                }}
                                variant="text" >
                                Mais Detalhes
                            </Button>
                        </Typography>
                    }
                    title={recipe.name}
                />
                {recipe.img.split('').slice(-4).join('') === '.jpg' ?
                    <Image src={recipe.img} width='500%' height='400%' alt={recipe.name} /> :
                    <CldImage src={recipe.img} width='500%' height='400%' />
                }

                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '75%', margin: '0 auto' }}>
                        <Typography data-testid="diffculty" paragraph>
                            {recipe.diffculty}
                        </Typography>
                        <Typography data-testid="duration" paragraph>
                            {recipe.duration}
                        </Typography>
                    </div>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore

                        expand={expanded}
                        onClick={() => handleExpandClick(recipe.name)}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <div>
                            <Typography paragraph variant='h6'>Ingredientes</Typography>
                            <Ingredients recipe={recipe} />
                        </div>
                        <div>
                            <Typography paragraph variant='h6'>Como Fazer</Typography>
                            {recipe.preparation}
                            <Typography paragraph>

                            </Typography>
                        </div>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}