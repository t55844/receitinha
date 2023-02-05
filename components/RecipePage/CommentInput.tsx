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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Typography from '@mui/material/Typography';
import { requestModel } from '../../js/fetch/fecth';

const schema = yup.object({
    comment: yup.string().trim().required('Você deve escrever seu comentario')
})
export default function CommentInput(props) {
    const { setNewComment } = props
    const { control, handleSubmit, getValues, reset, formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const recipe = useSelector((state) => state.recipePage.value)
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const router = useRouter()

    async function onSubmit(data) {

        const text = data.comment
        const comment = {
            name: user.name,
            text,
            recipesId: recipe.id
        }
        const resp = await requestModel('/api/comments', { method: 'POST', body: JSON.stringify(comment), headers: { "Content-Type": ' application/json' } })
            .then(resp => resp.json())

        setNewComment(resp.data)
        dispatch(recipeToCurrentPage(recipe))
        reset()

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <FormControl sx={{ width: '100%', height: '150px' }} variant="standard">

                <Typography sx={{ color: 'red', fontSize: '16px', margin: ' 0 auto' }} variant="body1">{errors.comment?.message}</Typography>

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
                                    variant="contained"
                                    type='submit'
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