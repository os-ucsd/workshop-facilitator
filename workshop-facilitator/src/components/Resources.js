import React from "react";
// import FileUpload from "./FileUpload";
import Upload from "./uploadComponents/Upload";
import '../styles/Resources.css';
import { Button } from "@material-ui/core";

class Resources extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
                <h2>Resources</h2>
                <ul>
                    <li>Resource 1</li>
                    <li>Resource 2</li>
                    <li>Resource 3</li>
                </ul>
                <div className="uploadBtn">
                    <Button color="primary" variant="contained" href="/upload">Upload</Button>
                </div>
                
            </div>
        )
    }
}

export default Resources;