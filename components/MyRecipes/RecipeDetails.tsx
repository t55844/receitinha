import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Ingredients from './Ingredients';

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
    const recipe = props.recipe
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader

                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={recipe.name}
            />
            <CardMedia
                component="img"
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
                    onClick={handleExpandClick}
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
    );
}


/**
 *                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                            large plate and set aside, leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                            stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.

                            difficulty
: 
"ijh"
duration
: 
"1"
email
: 
"guto22@yahoo.com"
image
: 
"C:\\fakepath\\bater-papo.png"
ingredient1
: 
"asffsdf"
ingredient2
: 
"dfsfdsfs"
ingredient3
: 
"afsafwere"
name
: 
"fghfghfghf"
preparation

 */