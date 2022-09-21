import Snackbar from "@mui/material/Snackbar";
import {Alert, Stack} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Slide, {SlideProps} from "@mui/material/Slide";
import {IconButton} from "@material-ui/core";
type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionRight(props: TransitionProps) {
    return <Slide {...props} direction="down"/>;
}

function SnackbarAlert({snackbarStatus, closeSnackbar, snackbarMessage}) {
    return (
        <Stack sx={{position: "absolute", bottom: 24, right: 24}} spacing={10}>
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                autoHideDuration={snackbarMessage.importFile === true ? 20000 : 6512}
                open={snackbarStatus}
                onClose={closeSnackbar}
                transitionDuration={{enter: 500, exit: 500}}
                TransitionComponent={TransitionRight}
            >
                <Alert severity={snackbarMessage.status} sx={{width: '100%', position: 'relative'}}>
                    <b>{snackbarMessage.message}</b> <br/>
                    {snackbarMessage.subMessage}
                    <a style={snackbarMessage.status === 'success' ? {
                            color: '#043927 ',
                            position: 'absolute',
                            top: '7px',
                            right: '10px'
                        } :
                        {color: '#8b0000', position: 'absolute', top: '7px', right: '10px'}} type="button"
                       className="close">
                        <IconButton size={'small'}
                                    style={snackbarMessage.status === 'success' ? {color: '#043927'} : {color: '#8b0000'}}>
                            <CloseIcon fontSize={'small'}
                                       onClick={() => closeSnackbar()}/>
                        </IconButton>
                    </a>
                </Alert>
            </Snackbar>
            {snackbarMessage.importFile === true ? (
                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }}
                    open={snackbarStatus}
                    transitionDuration={{enter: 500, exit: 500}}
                    TransitionComponent={TransitionRight}
                >
                    <Alert severity={'info'} sx={{width: '100%', position: 'relative'}}>
                        Items added:
                        {snackbarMessage.newData.length === 0 ? <b> No new items added!</b> :
                            snackbarMessage.newData.map((newItem) => (
                                <div style={{textIndent: '7px'}}><i className="fa fa-arrow-right fa-sm" aria-hidden="true"></i> Name: <b>{newItem}</b></div>
                            ))
                        }
                    </Alert>
                </Snackbar>
            ) : null}
        </Stack>
    )
}

export default SnackbarAlert;