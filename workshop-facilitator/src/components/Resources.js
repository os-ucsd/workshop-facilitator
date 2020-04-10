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
        this.state = {
            "resources": [
                {
                    "title": "Resource 1",
                    "src": "http://example.com",
                    "type": "url"
                },
                {
                    "title": "Resource 2",
                    "src": "http://example.com",
                    "type": "file"
                }
            ]
        }
    }

    componentDidMount() {
        // fetch resources from server and populate this.state.resources
    }

    render() {
        return (
            <div>
                <div className="ResourceFiles">
                    <h2 className="title">Resources</h2>
                    <ul>
                        {/* GET request from server to get uploaded resources */}
                        {this.state.resources.map(resource => 
                            <li> 
                                <img className="icons" src="https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/288/original/file-empty.png?1510679782" width="10" height="13"/>
                                <a href={resource.src} target="_blank">{resource.title} </a>
                                {resource.type == "url"?
                                    <img className="redirect" src="https://cdn4.iconfinder.com/data/icons/ui-ux-essentials/24/open-window-512.png" width="10" height="13"/> :
                                    <img className="redirect" src="https://lh3.googleusercontent.com/proxy/lGkDr1bKnYx9ZNhTUYffFm2AFkddrfwBRIa4OzTx16MypFTNE_PhVO3gaG9xpJlahHDDO9XmblIOWal5vUxd_b6n1r7mLGytLd-BhBvzgooCvFtdzQTgjPR42ByOe-iZMPY9IB1oVI0adjE3e1-WC8cpJw-vf1DFqUA" width="10" height="13"/>
                                }

                            </li>
                        )}
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