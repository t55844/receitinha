import * as React from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import DeleteSweepSharpIcon from '@mui/icons-material/DeleteSweepSharp';
import { Theme } from '@mui/system';

interface IQuestionModalProps {
    question: string;
    agree: string
    denied: string
    buttonName: string
    title: string
    agreeAction: () => void

}

export default function QuestionModal(props: IQuestionModalProps) {

    const [open, setOpen] = React.useState<boolean>(false);
    const { question, agree, denied, buttonName, title, agreeAction } = props
    const theme: Theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button startIcon={<DeleteSweepSharpIcon />} variant="outlined" onClick={handleClickOpen}>
                {buttonName}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {question}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        agreeAction()
                        handleClose()
                    }}>
                        {agree}
                    </Button>
                    <Button autoFocus onClick={handleClose} >
                        {denied}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}