import React from 'react';
import Button from '@material-ui/core/Button';

class FileUpload extends React.Component {



    render() {
        return (
            <div className="uploadContainer">
                <form>
                    <div className="upload-group">
                        <input type="file" multiple></input>
                    </div>
                    <div className="uploadBtn">
                        <Button type="submit" variant="contained" color="secondary">
                            Upload
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default FileUpload;