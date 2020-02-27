import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Upload from "../components/uploadComponents/Upload";

import "../styles/UploadFiles.css";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

class UploadFiles extends React.Component {
    render() {
        return (
            <div className="Container">
                <div className="Card">
                    <Upload />
                </div>
            </div>
        )
    }
}

export default UploadFiles;
