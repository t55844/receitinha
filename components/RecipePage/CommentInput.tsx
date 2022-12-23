import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import recipePresentation from '../../js/recipePage/recipePresentation';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { recipeToCurrentPage } from '../../js/redux/reduxSlice/recipePageSlice';
import { myRecipesForm } from '../../js/MyRecipes/myRecipesForm';

export default function CommentInput(props) {
    const { setNewComment } = props
    const { control, handleSubmit, getValues, reset } = useForm()

    const recipe = useSelector((state) => state.recipePage.value)
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const router = useRouter()

    function onSubmit(data) {
        event.preventDefault()
        const check = myRecipesForm.verifyFields(
            ['comment'],
            ['comentario'],
            data)
        if (check) {

            const text = data.comment
            const comment = {
                recipeId: recipe.id,
                name: user.name,
                email: user.email,
                text
            }
            recipePresentation.sendComment(comment)
                .then(resp => setNewComment(resp.payload))

            dispatch(recipeToCurrentPage(recipe))
            reset()
        }
    }

    return (
        <form >

            <FormControl sx={{ width: '100%', height: '150px' }} variant="standard">
                <InputLabel sx={{ height: '40%', fontSize: '130%' }} color='info' htmlFor="input-with-icon-adornment">
                    Escreva seu comentario aqui
                </InputLabel>
                <Controller
                    name="comment"
                    control={control}
                    defaultValue=''
                    rules={{ required: true }}
                    render={({ field }) => <Input
                        {...field}
                        sx={{ height: '60%' }}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position='end'>
                                <Button
                                    onClick={() => onSubmit(getValues())}
                                    variant="contained"
                                    size='small'
                                    endIcon={<SendIcon />}>
                                    Enviar
                                </Button>
                            </InputAdornment>
                        }
                    />}
                />
            </FormControl>
        </form>
    )
}