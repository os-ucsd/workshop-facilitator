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
                id: 1,
                question: "hello, what is ree act?",
                options: {
                    A: "A",
                    B: "B",
                    C: "C",
                    D: "D"
                }
            }, {
                id: 2,
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
            this.setState({poll: pollData});
        })

        // should also make the http request to get all polls and store in state
    }

    publishPoll = evt => {
        evt.preventDefault();
        const pollId = evt.target.id;

        // find poll in the array of polls
        const poll = this.state.polls.filter(poll => poll._id === pollId);

        // emit poll to server to emit to all clients
        socket.emit("publish", {poll})
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
        // make every poll's id the _id that mongodb creates for each poll when we send poll to db
        const poll = 
        <div>
            <button onClick={this.handleBack}>Back</button>
            <Poll id = {this.state.poll.id} question={this.state.poll.question} options={this.state.poll.options}/>
        </div>

        return (
            <div>
                <h2>Polls</h2>
                {
                    this.state.polls.map(poll => 
                        this.state.isEmptyState && <PollQuestion socket={socket} handleClick={this.triggerPollState} 
                            poll={poll}/>
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