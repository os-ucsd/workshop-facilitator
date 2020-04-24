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

    console.log(urlData);
    
    socket.emit("uploadURL", {urlData: urlData});
  }
  
  onChange = e => {
    console.log(e.target.value)
    if (e.target.value.indexOf("http://") == 0 || e.target.value.indexOf("https://") == 0) {
      this.setState({ errorText: '', invalidURL : false  })
    } else {
      this.setState({ errorText: "Missing http:// or https://"})
    }
  }

  render() {
    return (
      <div>
        <form noValidate autoComplete="off" onSubmit={this.uploadURL}>
          <TextField id="title" label="Title" fullWidth/>
          <br/>
          <TextField 
              id="url" 
              onChange={this.onChange}
              error={!!this.state.errorText}
              helperText={this.state.errorText}
              type="url"
              label="URL" 
              fullWidth />
          <br />
          <br />
          <div className="Upload">
            <Button
              variant="contained"
              style={{margin: "0 auto"}}
              type="submit"
              onClick={this.props.close}
              disabled={this.state.invalidURL}
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