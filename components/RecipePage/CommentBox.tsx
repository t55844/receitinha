import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import { IComment } from '../../js/interface_and_ultils/interface'

function CommentsBox(props) {
    const comment: IComment = props.comment
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