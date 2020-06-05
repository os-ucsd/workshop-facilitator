import React, { Component } from 'react';
import "../../styles/Upload.css";
import Dropzone from './Dropzone';
import { Button } from '@material-ui/core';
import Progress from './Progress';
import axios from "axios";
import io_client from "socket.io-client";

let socket;

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfulUpload: false
    }

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.addFile = this.addFile.bind(this);
  }

  componentDidMount() {
    socket = io_client("http://localhost:5000");
  }

  onFilesAdded(newFiles) {
    this.setState(curFiles => ({
      files: curFiles.files.concat(newFiles)
    }));
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfulUpload) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfulUpload) {
      return (
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            this.setState({ files: [], successfulUpload: false })
          }
        >
          Clear
                </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          disabled={this.state.files.length === 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </Button>
      );
    }
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfulUpload: true, uploading: false });
    } catch (e) {
      // throw error msg
      console.log("ERROR: Files were not uploaded");
      this.setState({ successfulUpload: false, uploading: false });
    }
  }

  sendRequest(file) {
    console.log(file);

    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      // Format the file to send
      const formData = new FormData();
      formData.append("name", file.name);
      formData.append("file", file);
      let fileName = file.name;

      // Upload the file
      axios.post("/upload", formData)
        .then((res) => (this.addFile(res.data, fileName)))
        .catch(err => console.log(err));
    })
  }

  addFile(encryptedName, fileName) {
    let urlData = {
        title: fileName,
        src: encryptedName,
        resType: "file"
      }
      
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
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfulUpload} >
            </Dropzone>
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

export default Upload;