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
            addModal: false,
            
            //new poll
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: ''
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
            addPoll: false
        })
    }

    handleChange = evt => {
        this.setState({
            [evt.target.id] : evt.target.value
        })
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
            }
        }
        polls.push(newPoll)
        this.setState({
            polls: polls
        })
        this.handleClose();
    }

    deletePoll = evt => {
        evt.preventDefault();
        const pollId = evt.target.id;

        // find poll in the array of polls and remove it
        const pollIndx = this.state.polls.findIndex(poll => poll._id === parseInt(pollId));
        console.log(pollIndx);
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

        // close question from view
        this.setState({
            ...this.state,
            isEmptyState: true,
            isPollState: false,
            publishedPoll: {}
        })
        
        console.log("unpublishing poll...");
        // emit poll to server to emit to all clients
        socket.emit("unpublish");
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

        // emit socket event to get the answers and put it in the state
        socket.emit("getAnswers");
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
        console.log(this.state);
        // prop sent from host or user page determining if the current user is a host or user
        const {isHost} = this.props;

        // make every poll's id the _id that mongodb creates for each poll when we send poll to db
        const poll = 
        <div>
            <button onClick={this.handleBack}>Back</button>
            <button id={this.state.poll._id} onClick={this.unpublishPoll}>Unpublish</button>
            <button id={this.state.poll._id} onClick={this.showAnswer}>Answer</button>
            {/*
            <Poll socket={socket} id={this.state.poll._id} question={this.state.poll.question} 
                options={this.state.poll.options} showAnswer={this.state.showAnswer} isPublished={this.state.poll._id === this.state.publishedPoll._id}
                isHost={isHost}/>
            */}
            <Poll socket={socket} id={this.state.poll._id} poll={this.state.poll} showAnswer={this.state.showAnswer} 
                isPublished={this.state.poll._id === this.state.publishedPoll._id} isHost={isHost}/>
        </div>

        return (
            <div>
                <h2>Polls</h2>
                {
                    this.state.polls.map(poll => 
                        this.state.isEmptyState && this.state.polls && this.state.polls.length > 0 && 
                            <div>
                                <PollQuestion handleClick={this.triggerPollState} 
                                    poll={poll}/>
                                {
                                    poll._id === this.state.publishedPoll._id ? <p>Published</p> : null
                                }
                                <button id={poll._id} onClick={this.publishPoll}>Publish</button>
                                <button id={poll._id} onClick={this.deletePoll}>Delete</button>
                                <button id={poll._id} onClick={this.getAnswers}>Get Answers</button>
                            </div>
                    )
                }
                {
                    this.state.isPollState && poll
                }
                <br></br>
                <Button variant="contained" color="primary" onClick={this.handleOpen}>Add Poll</Button>
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
                            <InputLabel htmlFor="age-native-required" autoWidth>Correct Answer</InputLabel>
                            <Select
                                value={this.state.answer}
                                onChange={this.handleChange}
                                id="answer"
                                inputProps={{
                                    id: 'age-native-required',
                                }}
                                >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="none">None</option>
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