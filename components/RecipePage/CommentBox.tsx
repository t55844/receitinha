import React from 'react'

import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { ICommentDb } from '../../js/interface_and_ultils/interface'

function CommentsBox(props: { comment: ICommentDb }) {
    const comment = props.comment
    return (
        <ListItem button>
            <ListItemAvatar>
                <Avatar alt={comment.name.split('')[0]} />
            </ListItemAvatar>
            <ListItemText primary={comment.name} secondary={comment.text} />
        </ListItem>
    )
}

export default (CommentsBox)