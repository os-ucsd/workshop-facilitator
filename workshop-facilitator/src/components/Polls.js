import React from "react";
import Poll from "./Poll";
import Button from '@material-ui/core/Button';
import io_client from "socket.io-client";

import '../styles/Polls.css'

let socket;

class Polls extends React.Component {
    constructor() {
        super();
        this.state = {
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
                }
            }, {
                _id: 2,
                question: "question 2",
                options: {
                    A: "1",
                    B: "2",
                    C: "3",
                    D: "4"
                }
            }],
            poll: {}
        }
    }

    componentDidMount(){
        socket = io_client("http://localhost:5000");
        
        // listen for a publish event if a poll was published
        socket.on("publish", pollData => {
            console.log("publishing...");
            // show the newly published poll questions
            this.setState({
                //...this.state,
                isEmptyState: false,
                isPollState: true,
                poll : pollData.pollData
            })
        })

        // should also make the http request to get all polls and store in state
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
            isPollState: false
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

    handleBack = (e) => {
        this.setState({
            ...this.state,
            isEmptyState: true,
            isPollState: false
        })
    }

    render() {
        console.log(this.state);
        // make every poll's id the _id that mongodb creates for each poll when we send poll to db
        const poll = 
        <div>
            <button onClick={this.handleBack}>Back</button>
            <button id={this.state.poll._id} onClick={this.unpublishPoll}>Unpublish</button>
            <Poll id = {this.state.poll._id} question={this.state.poll.question} options={this.state.poll.options}/>
        </div>

        return (
            <div>
                <h2>Polls</h2>
                {
                    this.state.polls.map(poll => 
                        this.state.isEmptyState && this.state.polls && this.state.polls.length > 0 && 
                            <div>
                                <PollQuestion socket={socket} handleClick={this.triggerPollState} 
                                    poll={poll}/>
                                <button id={poll._id} onClick={this.publishPoll}>Publish</button>
                                <button id={poll._id} onClick={this.deletePoll}>Delete</button>
                            </div>
                    )
                }
                {
                    this.state.isPollState && poll
                }
            </div>
        )
    }
}

const PollQuestion = props => {
    return (
    <div >
        <button className="pollQuestion" onClick={props.handleClick} value={props.poll.id}>
            {props.poll.id}. {props.poll.question}
        </button>
    </div>
    )
}

export default Polls;