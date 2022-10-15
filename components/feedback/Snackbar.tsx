import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { eventEmitter } from '../../js/interface_and_ultils/EventEmiter';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars() {
    const [open, setOpen] = React.useState<boolean>(false)
    const [type, setType] = React.useState<string>()
    const [menssage, setMenssage] = React.useState<string>()

    function showMenssage(feedback: { type: 'success' | "error" | "warning" | "info" | "success", menssage: string }) {
        setOpen(true)
        setType(feedback.type)
        setMenssage(feedback.menssage)
        setTimeout(() => setOpen(false), 6000)
    }
    React.useEffect(() => {
        eventEmitter.subscribe('snackbar_menssage', (feedback) => showMenssage(feedback))
    }, [])
    return (
        <Stack spacing={2} sx={{ width: '400px', height: '200px' }}>
            <Snackbar open={open} autoHideDuration={6000} >
                <Alert severity={type} sx={{ width: '100%' }}>
                    {menssage}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
