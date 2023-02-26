import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { AuthContext } from '../AuthContext';
import { requestModel, urlRecipes } from '../../js/fetch/fecth';
import { useSelector } from 'react-redux';
import { IResponse } from '../../pages/api/recipes';
import { IRecipeDB, IUserDb } from '../../js/interface_and_ultils/interface';
import { menssages } from '../../js/interface_and_ultils/menssages';

export default function LIkeAction(props: { showModal: () => void, value: boolean, setLike: (likes: number) => void }) {
    const authContext = React.useContext(AuthContext);
    const { showModal, setLike } = props;
    const user: IUserDb = useSelector(state => state.user.value)
    const recipe: IRecipeDB = useSelector(state => state.recipePage.value)

    async function tapLike() {

        if (authContext.isLoggedIn) {
            const res: IResponse = await requestModel(`${urlRecipes}/?like=${true}`, { method: 'PUT', body: JSON.stringify({ userId: user.id, recipeId: recipe.id }) })
                .then(res => res.json())

            if (res.error === true) {
                menssages.emiteMensageError(res.msg)


            } else {
                setLike(res.data.Likes.length)
                menssages.emiteMensageSuccess('Obrigado pela sua opinião')

            }
        } else {
            showModal()
        }
    }
    return (
        <Box sx={{ '& > :not(style)': { m: 1.5 } }} onClick={() => tapLike()}>
            <Fab color="primary" aria-label="add">
                <ThumbUpOutlinedIcon />
            </Fab>
        </Box>
    );
}