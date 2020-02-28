import React, {Compact, Component} from 'react';
import '../../styles/Dropzone.css'

class Dropzone extends Component {
    constructor(props) {
        super(props);
        this.state = {highlight: false};
        this.fileInputRef = React.createRef();
        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    openFileDialog() {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }

    onFilesAdded(evt) {
        if (this.props.disabled) return;
        const files = evt.target.files;
        if (this.props.onFileAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
    }

    fileListToArray(list) {
        let array = [];
        for (let i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }

    onDragOver(evt) {
        evt.preventDefault();

        if (this.props.disabled) return;

        this.setState({highlight: true});
    }
    
    onDragLeave(evt) {
        this.setState({highlight: false});
    }

    onDrop(evt) {
        evt.preventDefault();

        if (this.props.disabled) return;

        const files = evt.dataTransfer.files;
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
        this.setState({highlight: false});
    }

    render() {
        return (
            <div 
                className="Dropzone"
                onClick={this.openFileDialog}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                style={{ cursor: this.props.disabled ? "default" : "pointer"}}
                >
                <img
                    alt="upload"
                    className="Icon"
                    src="cloud_upload-24px.svg"
                />
                <input
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    multiple
                    onChange={this.onFileAdded}
                />
                <span>Upload Files</span>
            </div>
        );
    }
}

export default Dropzone;