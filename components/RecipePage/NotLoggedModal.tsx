
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import RegisterLogin from '../../pages/generalPages/RegisterLogin';
import LIkeAction from './LikeAction';

export default function NotLoggedModal(props: { setLike: (liked: number) => void }) {
    const setLike = props.setLike

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <LIkeAction setLike={setLike} showModal={handleClickOpen} />
            <Dialog
                maxWidth={false}

                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Você precisa entrar na sua conta fazer isso
                </DialogTitle>
                <DialogContent
                    sx={{ width: '90vw' }}

                >
                    <RegisterLogin />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Não quero</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}