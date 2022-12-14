import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Ingredients from './Ingredients';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import recipePresentation from '../../js/recipePage/recipePresentation';
import { IRecipeFromDB } from '../../js/interface_and_ultils/interface';
import { useSelector, useDispatch } from 'react-redux';




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

export default function RecipeDetails(props) {
    const recipe: IRecipeFromDB = props.recipe
    const [expanded, setExpanded] = React.useState(false);

    const router = useRouter()
    const dispatch = useDispatch()

    const handleExpandClick = (currentName: string) => {
        if (recipe.name === currentName) {
            setExpanded(!expanded);
        }
    };

    return (
        <div >
            <Card sx={{ width: '100%' }}>
                <CardHeader
                    action={
                        <Typography variant='body1' >
                            <Button
                                onClick={() => recipePresentation.buttonLinkToPage('/recipePages/', recipe, router, dispatch)}
                                variant="text" >
                                Mais Detalhes
                            </Button>
                        </Typography>
                    }
                    title={recipe.name}
                />
                <CardMedia
                    component="img"
                    role='img'
                    height="194"
                    image={recipe.img}
                />
                <CardContent>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '75%', margin: '0 auto' }}>
                        <Typography paragraph>
                            {recipe.difficulty}
                        </Typography>
                        <Typography paragraph>
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