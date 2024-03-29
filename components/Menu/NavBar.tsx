import * as React from 'react';
import { AuthContext } from '../AuthContext';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongSharpIcon from '@mui/icons-material/ReceiptLongSharp';
import CakeSharpIcon from '@mui/icons-material/CakeSharp';
import LocalPizzaSharpIcon from '@mui/icons-material/LocalPizzaSharp';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { colors } from '../MaterialUI/theme';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Image from 'next/future/image';

export default function NavBar() {
    const authContext: { isLoggedIn?: boolean } = React.useContext(AuthContext)


    return (
        <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb"
                sx={{ background: colors.primaryLigth, display: 'flex', justifyContent: 'space-around', padding: '10px 15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', margin: '0 12px' }}><Image style={{ margin: '0 12px', borderRadius: '8px' }} alt='logo do site' width={40} height={40} src='/logo.png' /> Receitinha</div>



                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', fontSize: 'large' }}
                    color="inherit"
                    href="/"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Inicio
                </Link>

                {
                    authContext.isLoggedIn ?
                        <Link
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center', fontSize: 'large' }}
                            color="inherit"
                            href="/generalPages/Form"
                        >
                            <ReceiptLongSharpIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Minhas Receitas
                        </Link> : null

                }

                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', fontSize: 'large', }}
                    color="inherit"
                    href="/generalPages/Sarch"

                >
                    <LocalDiningIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Receitas
                </Link>

                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', fontSize: 'large', }}
                    color="inherit"
                    href="/generalPages/RegisterLogin"
                >
                    <MeetingRoomIcon />
                    Entrar/Registar
                </Link>

            </Breadcrumbs>
        </div>
    );
}
