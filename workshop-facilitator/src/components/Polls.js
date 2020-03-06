import React from "react";
import Poll from "./Poll";
import Button from '@material-ui/core/Button';
import io_client from "socket.io-client";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";


import '../styles/Polls.css'

let socket;

class Polls extends React.Component {
    constructor() {
        super();
        this.state = {
            showAnswer: false,
            isEmptyState: true,
            isPollState: false,
            // template poll object
            polls: [{
                _id: 1,
                question: "hello, what is ree act?",
                options: {
                    A: "A",
                    B: "B",
                    C: "C",
                    D: "D"
                },
                answer: "C"
            }, {
                _id: 2,
                question: "question 2",
                options: {
                    A: "1",
                    B: "2",
                    C: "3",
                    D: "4"
                },
                answer: "B"
            }],
            poll: {},
            answers: {},
            publishedPoll: {},
            addPoll: false,
            editPoll: false,
            //new poll
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            answer: ''
        }
    }

    componentDidMount(){
        socket = io_client("http://localhost:5000");

        socket.on("err", errorData => {
            alert(errorData.error);
        })
    
        // listen for a publish event if a poll was published
        socket.on("publish", pollData => {
            console.log("publishing...", pollData);
            // show the newly published poll questions
            this.setState({
                //...this.state,
                isEmptyState: false,
                isPollState: true,
                poll : pollData,
                publishedPoll: pollData
            })
        })

        socket.on("unpublish", () => {
            // close question from view when successfully unpublished
            this.setState({
                ...this.state,
                isEmptyState: true,
                isPollState: false,
                publishedPoll: {}
            })
        })

        // listen for a getAnswers event to populate the state variable with user answers
        socket.on("getAnswers", answers => {
            console.log("getting answers...");
            this.setState({
                answers
            })
        })

        // listen for showanswer event and set the showanswer state to previous
        socket.on("showAnswer", answer => {
            console.log("showing answer...");
            this.setState(prevState => {
                return {showAnswer: !prevState.showAnswer};
            })
        })
        
        // should also make the http request to get all polls and store in state
    }

    handleOpen = () => {
        this.setState({
            addPoll: true
        })

    }

    handleClose = () => {
        this.setState({
            addPoll: false,
            editPoll: false
        })
    }

    handleChange = evt => {
        if(evt.target.id === undefined) {
            this.setState({
                [evt.target.name] : evt.target.value,
            })
        }
        else {
            this.setState({
                [evt.target.id] : evt.target.value,
            })
        }
    }
    
    handleAdd = () => {
        let polls = this.state.polls;
        let newPoll = {
            _id: this.state.polls.length+1,
            question: this.state.question,
            options : {
                A: this.state.optionA,
                B: this.state.optionB,
                C: this.state.optionC,
                D: this.state.optionD
            },
            answer: this.state.answer
        }
        polls.push(newPoll)
        this.setState({
            polls
        })
        this.handleClose();
    }

    editPoll = () => {
        this.setState({
            editPoll: true
        })
    }

    handleEdit = evt => {
        evt.preventDefault();
        let updatedPoll = {
            _id: this.state.poll._id,
            question: evt.target[0].value,
            options : {
                A: evt.target[1].value,
                B: evt.target[2].value,
                C: evt.target[3].value,
                D: evt.target[4].value
            },
            answer: evt.target[5].value
        }

        // Update the Polls array
        const pollId = this.state.poll._id;
        // find poll in the array of polls
        const pollIndx = this.state.polls.findIndex(poll => poll._id === parseInt(pollId));
        let polls = this.state.polls;
        polls[pollIndx] = updatedPoll;
        
        this.setState({
            poll: updatedPoll,
            polls
        })

        this.handleClose();
    }

    deletePoll = evt => {
        evt.preventDefault();
        const pollId = evt.target.id;

        // find poll in the array of polls and remove it
        const pollIndx = this.state.polls.findIndex(poll => poll._id === parseInt(pollId));
        this.setState(prevState => {
            prevState.polls.splice(pollIndx, 1);
            let polls = prevState.polls;
            return {polls}
        })
    }

    publishPoll = evt => {
        evt.preventDefault();
        const pollId = evt.target.id;

        // find poll in the array of polls
        const poll = this.state.polls.filter(poll =>{
            return poll._id === parseInt(pollId);
        })
        
        // emit poll to server to emit to all clients
        socket.emit("publish", {pollData: poll[0]})
    }

    unpublishPoll = evt => {
        evt.preventDefault();
        const pollId = evt.target.id;

        // clear the answers state
        this.setState({answers: {}})
        
        console.log("unpublishing poll...");
        // emit poll to server to emit to all clients and send poll that you
        // are trying to unpublish to make sure its the same as the current poll
        socket.emit("unpublish", pollId);
    }

    triggerPollState = e => {
        let pollId = e.currentTarget.value - 1
        this.setState({
            ...this.state,
            isEmptyState: false,
            isPollState: true,
            poll : this.state.polls[pollId]
        })
    }

    getAnswers = evt => {
        evt.preventDefault();
        const pollId = evt.target.id;

        // emit socket event to get the answers and put it in the state
        socket.emit("getAnswers", pollId);
    }

    showAnswer = evt => {
        evt.preventDefault();

        // emit show answer event so users can see the answer on their screen too
        socket.emit("showAnswer", {answer: this.state.poll.answer});
    }

    handleBack = (e) => {
        this.setState({
            ...this.state,
            isEmptyState: true,
            isPollState: false
        })
    }

    render() {
        // prop sent from host or user page determining if the current user is a host or user
        const {isHost} = this.props;
        const {publishedPoll} = this.state;

        // make every poll's id the _id that mongodb creates for each poll when we send poll to db
        const poll = 
        <div>
            {
                // only host can have these button options
                isHost ? 
                    <React.Fragment>
                        <button onClick={this.handleBack}>Back</button>
                        <button id={this.state.poll._id} onClick={this.unpublishPoll}>Unpublish</button>
                        <button id={this.state.poll._id} onClick={this.showAnswer}>
                            {
                                // change the text of the button depending on if the user has the answer shown or hidden
                                this.state.showAnswer ? "Hide Answer" : "Show Answer"
                            }
                        </button>
                        <button id={this.state.poll._id} onClick={this.getAnswers}>Get User Answers</button>
                        <button onClick={this.editPoll}>Edit</button> 
                    </React.Fragment>
                    : null
            }
            {/*
            <Poll socket={socket} id={this.state.poll._id} question={this.state.poll.question} 
                options={this.state.poll.options} showAnswer={this.state.showAnswer} isPublished={this.state.poll._id === this.state.publishedPoll._id}
                isHost={isHost}/>
            */}
            <Poll socket={socket} id={this.state.poll._id} poll={this.state.poll} showAnswer={this.state.showAnswer} 
                isPublished={this.state.poll._id === this.state.publishedPoll._id} isHost={isHost} userAnswers={this.state.answers}/>
        </div>

        return (
            <div>
                <h2>Polls</h2>
                {
                    // show list of questions if host and nothing if user -- user only sees published posts
                    isHost ? 
                        this.state.polls.map(poll => 
                            this.state.isEmptyState && this.state.polls && this.state.polls.length > 0 && 
                                <div>
                                    <PollQuestion handleClick={this.triggerPollState} 
                                        poll={poll}/>
                                    {
                                        poll._id === publishedPoll._id ? <p>Published</p> : null
                                    }
                                    <button id={poll._id} onClick={this.publishPoll}>Publish</button>
                                    <button id={poll._id} onClick={this.deletePoll}>Delete</button>
                                </div>
                        ) : 
                        /* if there's a published poll, show it for the user and if not, show nothing
                        publishedPoll._id ? 
                            <Poll socket={socket} id={publishedPoll._id} poll={publishedPoll} showAnswer={this.state.showAnswer} 
                                isPublished={true} isHost={isHost}/> : null
                                */
                        null
                }
                {
                    // show current poll if a poll should be shown
                    isHost || (!isHost && this.state.publishedPoll) ? this.state.isPollState && poll : null
                }
                <br></br>

                {isHost? this.state.isEmptyState && 
                <Button variant="contained" color="primary" onClick={this.handleOpen}>Add Poll</Button> : null }
                
                {/* Add Poll Dialog */}

                <Dialog open={this.state.addPoll} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth="md">
                    <DialogTitle id="form-dialog-title">New Poll</DialogTitle>
                    <DialogContent>
                    <form onChange={this.handleChange}>
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
                                value={this.state.answer}
                                onChange={this.handleChange}
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
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAdd} color="primary">
                        Confirm
                    </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit Poll Dialog */}
                <Dialog open={this.state.editPoll} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth="md">
                    <DialogTitle id="form-dialog-title">Edit Poll</DialogTitle>
                    <DialogContent>
                    <form id="editForm" onSubmit={this.handleEdit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="question"
                            label="Question"
                            type="text"
                            defaultValue={this.state.poll.question}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="optionA"
                            label="Option A"
                            type="text"
                            defaultValue={"I can't parse the damn object..."}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="optionB"
                            label="Option B"
                            type="text"
                            defaultValue={"I can't parse the damn object..."}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="optionC"
                            label="Option C"
                            type="text"
                            defaultValue={"I can't parse the damn object..."}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="optionD"
                            label="Option D"
                            type="text"
                            defaultValue={"I can't parse the damn object..."}
                            fullWidth
                        />
                        <FormControl style={{minWidth: 150}}>
                            <InputLabel>{this.state.poll.answer}</InputLabel>
                            <Select
                                value={this.state.answer}
                                onChange={this.handleChange}
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
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" form="editForm">
                        Confirm
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const PollQuestion = props => {
    return (
    <div >
        <button className="pollQuestion" onClick={props.handleClick} value={props.poll._id}>
            {props.poll._id}. {props.poll.question}
        </button>
    </div>
    )
}

export default Polls;