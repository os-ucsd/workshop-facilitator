import React from "react";
import UploadDialog from "./uploadComponents/UploadDialog";
import '../styles/Resources.css';
import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class Resources extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
                <div className="ResourceFiles">
                    <h2>Resources</h2>
                    <ul>
                        <li>Resource 1</li>
                        <li>Resource 2</li>
                        <li>Resource 3</li>
                    </ul>
                </div>
                <div className="UploadDialog">
                    <UploadDialog />
                </div>
                
            </div>
        )
    }
}

export default Resources;