import React, { useEffect, useState, Component } from 'react'
import { useSelector } from 'react-redux'
import { requestModel, urlComments } from '../../js/fetch/fecth'
import { ICommentDb, IRecipeDB } from '../../js/interface_and_ultils/interface'
import { IResponse } from '../../pages/api/recipes/recipes'


import TitleOfSection from '../Menu/TitleOfSection'
import CommentsBox from './CommentBox'
import CommentInput from './CommentInput'

function RecipeComments(props) {

    const [comments, setComments] = useState<ICommentDb[]>([])

    const recipe: IRecipeDB = useSelector((state) => state.recipePage.value)


    useEffect(() => async () => {
        const resp: IResponse = await requestModel(`${urlComments}/?id=${recipe.email}`, { method: 'GET' })
            .then(res => res.json())

        setComments(resp.data)
    }, [])


    return (
        <>
            <TitleOfSection text={'Comentarios e sugestões'} />
            <div>
                <CommentInput setNewComment={setComments} />
            </div>
            <div>
                {comments.map(comment => <CommentsBox key={Math.random()} comment={comment} />)}

            </div>
        </>
    )
}

export default (RecipeComments)