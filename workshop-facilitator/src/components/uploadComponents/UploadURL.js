import React, { Component } from 'react';
import "../../styles/Upload.css";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import io_client from "socket.io-client";

let socket;

class Upload extends Component {
  constructor() {
    super();

    this.state = {
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
      resType: "url"
    }
    this.setState({urlData});
    
    let reqURL = "http://localhost:5000/rooms/" + this.props.roomID + "/resources/upload"
    fetch(reqURL, {
      method: 'POST',
      body: JSON.stringify(urlData),
      headers: { 'Content-type': 'application/json' }
    })
    .then((res) => res.json())
    .then((data) => console.log("Success! ", data))
    .catch(err => console.log("Error " + err));

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