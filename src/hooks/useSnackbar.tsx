import React, {useCallback} from 'react';
import {Snackbar} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function useSnackBar() {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [severity, setSeverity] = React.useState<"success" | "error" | "warning" | "info">("success" )

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const openSnack = useCallback((customSeverity:"success" | "error" | "warning" | "info",
                                   customMessage:string) => {
        setOpen(true)
        setMessage(customMessage)
        setSeverity(customSeverity)
    },[])

    const snack = (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );

    return {snack, openSnack}
}
