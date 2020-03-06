import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

class EditPoll extends React.Component {
    constructor(){
        super();

    }

    render(){
        //editPoll={this.state.editPoll} onClose={this.handleClose} handleEdit={this.handleEdit}
        //poll={this.state.poll} handleChange={this.handleChange} answer={this.state.answer}
        const {editPoll, handleClose, handleEdit, poll, handleChange, answer} = this.props;
        return(
            <Dialog open={editPoll} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth="md">
            <DialogTitle id="form-dialog-title">Edit Poll</DialogTitle>
            <DialogContent>
            <form id="editForm" onSubmit={handleEdit}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="question"
                    label="Question"
                    type="text"
                    defaultValue={poll.question}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="optionA"
                    label="Option A"
                    type="text"
                    defaultValue={poll.options ? poll.options.A : ""}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="optionB"
                    label="Option B"
                    type="text"
                    defaultValue={poll.options ? poll.options.B : ""}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="optionC"
                    label="Option C"
                    type="text"
                    defaultValue={poll.options ? poll.options.C : ""}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="optionD"
                    label="Option D"
                    type="text"
                    defaultValue={poll.options ? poll.options.D : ""}
                    fullWidth
                />
                <FormControl style={{minWidth: 150}}>
                    <InputLabel>{poll.answer}</InputLabel>
                    <Select
                        value={answer}
                        onChange={handleChange}
                        name="answer"
                        >
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                        <MenuItem value="C">C</MenuItem>
                        <MenuItem value="D">D</MenuItem>
                        <MenuItem value="none">None</MenuItem>
                    </Select>
                </FormControl>
            </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button color="primary" type="submit" form="editForm">
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
        )
    }
}

export default EditPoll;