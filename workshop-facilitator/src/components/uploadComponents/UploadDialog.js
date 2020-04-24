import React from "react";
import Upload from "./Upload";
import UploadURL from "./UploadURL";

import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import "../../styles/UploadDialog.css";

export default function UploadDialog() {
    const [open, setOpen] = React.useState(false);
    const [URLOpen, setURLOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(false);


    const handleClick = (evt) => {
        setAnchorEl(evt.currentTarget);
    }

    const handleFileUpload = () => {
        setOpen(true);
    };

    const handleURLUpload = () => {
        setURLOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setURLOpen(false);
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained" color="primary">
                Upload
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleURLUpload}>URL</MenuItem>
                <MenuItem onClick={handleFileUpload} className="OpenDialogBtn">File</MenuItem>
            </Menu>

            <Dialog
                fullWidth={true}
                //maxWidth={"sm"}
                open={URLOpen}
                onClose={handleClose}
                aria-labelledby="upload-dialog-title"
            >
                <DialogTitle id="upload-dialog-title">Upload via URL</DialogTitle>
                <DialogContent className="UploadDialogContent">
                    <UploadURL />
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

            <Dialog
                fullWidth={true}
                //maxWidth={"sm"}
                open={open}
                onClose={handleClose}
                aria-labelledby="upload-dialog-title"
            >
                <DialogTitle id="upload-dialog-title">Upload via Local</DialogTitle>
                <DialogContent className="UploadDialogContent">
                    <Upload />
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </div>
    );
}