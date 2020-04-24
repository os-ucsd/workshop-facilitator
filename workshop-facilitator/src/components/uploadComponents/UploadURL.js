import React, { Component } from 'react';
import "../../styles/Upload.css";
import Dropzone from './Dropzone';
import { Button } from '@material-ui/core';
import Resources from '../Resources';
import Progress from './Progress';
import TextField from '@material-ui/core/TextField'
import io_client from "socket.io-client";

let socket;

class Upload extends Component {
  constructor() {
    super();

    this.state = {
      urlData: {
        title: "",
        url: ""
      },
      errorText: "",
      invalidURL: true
    }
  }

  componentDidMount() {
    socket = io_client("http://localhost:5000");
  }

  uploadURL = e => {
    e.preventDefault();

    let urlData = {
      title: e.target[0].value,
      src: e.target[1].value,
      type: "url"
    }
    this.setState({urlData});
    
    socket.emit("uploadURL", {urlData: urlData});

    this.props.close()
  }

  render() {
    return (
      <div>
        <form autoComplete="off" onSubmit={this.uploadURL}>
          <TextField id="title" label="Title" type="text" required fullWidth/>
          <br/>
          <TextField 
              id="url" 
              type="url"
              label="URL" 
              fullWidth 
              required/>
          <br />
          <br />
          <div className="Upload">
            <Button
              variant="contained"
              style={{margin: "0 auto"}}
              type="submit"
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Upload;