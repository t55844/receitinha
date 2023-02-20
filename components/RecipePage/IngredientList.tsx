import * as React from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NumbersSharpIcon from '@mui/icons-material/NumbersSharp';
import { Typography } from '@mui/material';


export default function IngredientList(props: { ingredient: { ingredient: string }[] }) {
    const ingredients = props.ingredient

    return (
        <Box sx={{ width: '80%', bgcolor: 'background.paper', backgroundColor: 'none' }}>
            <Typography variant='h6' >Ingredients</Typography>
            <List>
                {ingredients.map(item => (<ListItem key={Math.random()} disablePadding>
                    <ListItemIcon>
                        <NumbersSharpIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText primary={item.ingredient} />
                </ListItem>))}
            </List>
        </Box>
    );
}