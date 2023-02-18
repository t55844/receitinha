import React from 'react';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import { eventEmitter } from '../../js/interface_and_ultils/EventEmiter';


export default function Snackbars() {
    const { enqueueSnackbar } = useSnackbar();
    React.useEffect(() => {
        eventEmitter.subscribe('snackbar_menssage', (feedback) => handleClickVariant(feedback))
    }, [])

    const handleClickVariant = (feedback: { type: VariantType, menssage: string }) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(feedback.menssage, { variant: feedback.type });
    };
    return (
        <SnackbarProvider >
            <div></div>
        </SnackbarProvider>
    );
}

