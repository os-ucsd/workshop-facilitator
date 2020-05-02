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

class AddPoll extends React.Component {
    render(){
        //addPoll={this.addPoll} handleClose={this.handleClose} handleChange={this.handleChange}
                   // answer={this.state.answer} handleAdd={this.handleAdd}

        //right now addPolls doesn't do anything with currRoom
        const {addPoll, handleClose, handleChange, answer, handleAdd} = this.props;
        
        return(
            <Dialog open={addPoll} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth="md">
            <DialogTitle id="form-dialog-title">New Poll</DialogTitle>
            <DialogContent>
            <form onChange={handleChange}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="question"
                    label="Question"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="optionA"
                    label="Option A"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="optionB"
                    label="Option B"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="optionC"
                    label="Option C"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="optionD"
                    label="Option D"
                    type="text"
                    fullWidth
                />
                <FormControl style={{minWidth: 150}}>
                    <InputLabel htmlFor="age-native-required" >Correct Answer</InputLabel>
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
            <Button onClick={handleAdd} color="primary">
                Confirm
            </Button>
            </DialogActions>
        </Dialog>
        )
    }
}

export default AddPoll;
