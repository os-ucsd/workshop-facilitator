import React from "react";
import UploadDialog from "./uploadComponents/UploadDialog";
import '../styles/Resources.css';
import io_client from "socket.io-client";
import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

let socket;

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
        // fetch resources from database and populate this.state.resources
        

        // socket for sending resources in real time
        socket = io_client("http://localhost:5000");

        socket.on("uploadURL", data => {
            let newResources = this.state.resources;
            newResources.push(data.urlData);
            this.setState({
                resources: newResources
            })
        })
    }

    render() {
        const isHost = this.props.isHost;

        return (
            <div>
                <div className="ResourceFiles">
                    <h2 className="title">Resources</h2>
                    <ul>
                        {/* GET request from server to get uploaded resources */}
                        {this.state.resources.map(resource => 
                            <li> 
                                <img className="icons" src="https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/288/original/file-empty.png?1510679782" width="10" height="13"/>
                                <a target="_blank" href={resource.src} >{resource.title} </a>
                                {resource.type == "url"?
                                    <img className="redirect" src="https://cdn4.iconfinder.com/data/icons/ui-ux-essentials/24/open-window-512.png" width="15" height="13"/> :
                                    <img className="redirect" src="https://img.icons8.com/ios/500/download-from-cloud.png" width="15" height="15"/>
                                }
                            </li>
                        )}
                    </ul>
                </div>
                {
                    isHost? 
                    <div className="UploadDialog">
                        <UploadDialog />
                    </div> : null
                }

                
            </div>
        )
    }
}

export default Resources;