import React, { Component } from 'react';
import "../../styles/Upload.css";
import Dropzone from './Dropzone';
import { Button } from '@material-ui/core';
import Resources from '../Resources';
import Progress from './Progress';
import TextField from '@material-ui/core/TextField'

class Upload extends Component {
  constructor() {
    super();
  }

  uploadURL() {

  }
  
  render() {
    return (
      <div>
        <form noValidate autoComplete="off">
          <TextField id="title" label="Title" fullWidth/>
          <br/>
          <TextField id="url" label="URL" fullWidth />
        </form>
        <br />
        <div className="Upload">
          <Button
            variant="contained"
            onClick={this.uploadURL}
            style={{margin: "0 auto"}}
          >
            Upload
          </Button>
        </div>
      </div>
    );
  }
}

export default Upload;