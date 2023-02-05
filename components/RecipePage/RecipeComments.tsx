import React, { useEffect, useState, Component } from 'react'
import { useSelector } from 'react-redux'
import { requestModel } from '../../js/fetch/fecth'

import TitleOfSection from '../Menu/TitleOfSection'
import CommentsBox from './CommentBox'
import CommentInput from './CommentInput'

function RecipeComments(props) {

    const [comments, setComments] = useState([])

    const recipe = useSelector((state) => state.recipePage.value)


    useEffect(() => async () => {
        const resp = await requestModel(`/api/comments/?id=${recipe.id}`, { method: 'GET' })
            .then(res => res.json())

        setComments(resp)
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