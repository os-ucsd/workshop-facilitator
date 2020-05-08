import React from "react";
import UploadDialog from "./uploadComponents/UploadDialog";
import '../styles/Resources.css';
import io_client from "socket.io-client";
import {extractFileOrURLType} from '../utils';

import URL from "./resourceIcons/URL.png";
import PDF from "./resourceIcons/PDF.jpg";
import SLIDES from "./resourceIcons/SLIDES.png";
import DOC from "./resourceIcons/DOC.png";


let socket;

class Resources extends React.Component {
    constructor() {
        super();
        this.state = {
            "resources": null
        }
        //const images = require.context('./resourceIcons', true);
    }

    componentDidMount() {
        // fetch resources from database and populate this.state.resources
        let reqURL = "http://localhost:5000/rooms/" + this.props.roomID + "/resources"
        fetch(reqURL)
            .then(res => res.json())
            .then(resources => this.setState({resources}))

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

    iconReturnWeb = (source) => {
        switch(extractFileOrURLType(source)) {
            case "slides":
                return SLIDES;
            case "PDF":
                return PDF;
            case "URL":
                return URL;
            case "docs":
                return DOC;


            default:
                return URL;
        }

    }

    render() {
        const isHost = this.props.isHost;

        return (
            <div>
                <div className="ResourceFiles">
                    <h2 className="title">Resources</h2>
                    <ul>
                        {/* GET request from server to get uploaded resources */}

                        {this.state.resources ? this.state.resources.map(resource =>
                            <li>
                            {console.log(extractFileOrURLType(resource.src))}
                            {/*https://s3.amazonaws.com/iconbros/icons/icon_pngs/000/000/288/original/file-empty.png?1510679782" original width and height 10,13 */}
                                <img className="icons"  src={this.iconReturnWeb(resource.src)}  width="30" height="30"
                                /*require(String(extractFileOrURLType(resource.src)))*/ /*} width="30" height="30" alt="file icon"*//>
                                <a target="_blank" href={resource.src} rel="noopener noreferrer">{resource.title} </a>
                                {/*resource.resType === "url"?
                                    <img className="redirect" src="https://cdn4.iconfinder.com/data/icons/ui-ux-essentials/24/open-window-512.png" width="15" height="13" alt="open link icon"/> :
                                    <img className="redirect" src="https://img.icons8.com/ios/500/download-from-cloud.png" width="15" height="15" alt="download icon"/>
                                */}
                            </li>
                        ) : null}
                    </ul>
                </div>
                {
                    isHost?
                    <div className="UploadDialog">
                        <UploadDialog roomID={this.props.roomID}/>
                    </div> : null
                }


            </div>
        )
    }
}

export default Resources;
