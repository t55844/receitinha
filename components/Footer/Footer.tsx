import React from 'react'
import { colors } from '../MaterialUI/theme'
import { Typography } from '@mui/material';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CopyrightIcon from '@mui/icons-material/Copyright';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';

export default function Footer(props) {
    return (
        <div style={{ backgroundColor: colors.primary, display: 'flex', padding: '0 1.5rem', margin: '3rem 0 0' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <CopyrightIcon />
                <Typography variant='subtitle1'
                    sx={{ margin: "2rem" }} >
                    Termos de uso e políticas de privacidade.
                </Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <MonetizationOnIcon />
                <Typography variant='subtitle1'
                    sx={{ margin: "2rem" }} >
                    Anuncie.
                </Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <PermPhoneMsgIcon />
                <Typography variant='subtitle1'
                    sx={{ margin: "2rem" }} >
                    Contato.
                </Typography>
            </div>
        </div>
    )
}