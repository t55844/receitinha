import React from 'react'
import Typography from '@mui/material/Typography';
import { colors } from '../MaterialUI/theme';


const TitleOfSection = (props: { text: string }) => {
    return (
        <Typography variant='h5' sx={{ width: '100%', borderBottom: `4px solid ${colors.primary}`, background: colors.opacity, height: '50px', textAlign: 'center', paddingTop: '12px', margin: '1% auto' }}>
            {props.text}
        </Typography>

    )
}

export default TitleOfSection