import React from "react";
import Poll from "./Poll";

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

    triggerPollState = e => {
        let pollId = e.currentTarget.value - 1
        this.setState({
            ...this.state,
            isEmptyState: false,
            isPollState: true,
            poll : this.state.polls[pollId]
        })
    }

    render() {
        return (
            <div>
                <h2>Polls</h2>
                {
                    this.state.polls.map(poll => 
                        this.state.isEmptyState && <PollQuestion handleClick={this.triggerPollState} poll={poll}/>
                    )
                }
                {
                    this.state.isPollState && <Poll question={this.state.poll.question} options={this.state.poll.options}/>
                }
            </div>
        )
    }
}

const PollQuestion = props => {
    return (
    <div>
        {props.poll.id}. {props.poll.question}&nbsp;
        <button onClick={props.handleClick} value={props.poll.id} >Publish</button>
    </div>
    )
}

export default Polls;