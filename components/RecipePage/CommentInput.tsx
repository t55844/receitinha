import * as React from 'react';
import { requestModel, urlComments } from '../../js/fetch/fecth';
import * as yup from "yup";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { recipeToCurrentPage } from '../../js/redux/reduxSlice/recipePageSlice';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import { OptionalObjectSchema, TypeOfShape } from 'yup/lib/object';
import { RequiredStringSchema } from 'yup/lib/string';
import { AnyObject } from 'yup/lib/types';
import { FieldValues } from 'react-hook-form/dist/types';
import { ICommentForm, IRecipeDB, IUserLogin } from '../../js/interface_and_ultils/interface';
import { Dispatch } from 'redux';
import { IResponse } from '../../pages/api/recipes/recipes';


const schema: OptionalObjectSchema<{
    comment: RequiredStringSchema<string, AnyObject>;
}, AnyObject, TypeOfShape<{
    comment: RequiredStringSchema<string, AnyObject>;
}>> =
    yup.object({
        comment: yup.string().trim().required('Você deve escrever seu comentario')
    })

export default function CommentInput(props: {
    setNewComment: React.Dispatch<React.SetStateAction<any[]>>
}) {
    const { setNewComment } = props
    const { control, handleSubmit, getValues, reset, formState: { errors }
    } = useForm<FieldValues, any>({
        resolver: yupResolver(schema)
    })

    const recipe: IRecipeDB = useSelector((state) => state.recipePage.value)
    const user: { name: string, email: string, id: number } = useSelector((state) => state.user.value)
    const dispatch: Dispatch = useDispatch()


    async function onSubmit(data: { comment: ICommentForm }) {
        console.log(recipe.id)
        const text: string = data.comment
        const comment = {
            name: user.name,
            email: user.email,
            user_id: user.id,
            recipeId: recipe.id,
            text,
        }
        const resp: IResponse = await requestModel(urlComments, { method: 'POST', body: JSON.stringify(comment), headers: { "Content-Type": ' application/json' } })
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