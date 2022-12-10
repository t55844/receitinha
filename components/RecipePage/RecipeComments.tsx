import React, { useEffect, useState, Component } from 'react'
import { IComment } from '../../js/interface_and_ultils/interface'
import recipePresentation from '../../js/recipePage/recipePresentation'
import TitleOfSection from '../Menu/TitleOfSection'
import CommentsBox from './CommentBox'
import CommentInput from './CommentInput'

function RecipeComments(props) {

    const [comments, setComments] = useState([])

    useEffect(() => {
        recipePresentation.getComments()
            .then(resp => setComments(resp.payload))
            .catch(error => console.log('HOC Comments' + error))
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