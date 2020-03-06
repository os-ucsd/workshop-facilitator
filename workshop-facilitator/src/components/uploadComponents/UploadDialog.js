import React from "react";
import Upload from "./Upload";
import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../../styles/UploadDialog.css";

export default function UploadDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                className="OpenDialogBtn"
            >
                Upload
            </Button>
            <Dialog
                fullWidth={true}
                //maxWidth={"sm"}
                open={open}
                onClose={handleClose}
                aria-labelledby="upload-dialog-title"
            >
                <DialogTitle id="upload-dialog-title">Upload</DialogTitle>
                <DialogContent className="UploadDialogContent">
                    <Upload />
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </div>
    );
}