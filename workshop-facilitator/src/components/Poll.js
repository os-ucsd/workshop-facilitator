import React from 'react';

import '../styles/Polls.css'

class Poll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            socket: null,
        }
    }

    /*
        When a user chooses their answer, send that answer to the server to
        keep a counter, like Clickers
    */
   sendAnswer = evt => {
       evt.preventDefault();
       // sent the socket instance from Polls to Poll
        const {socket} = this.props;
        const answer = evt.target.id;

        console.log(this.props);

        // send the answer to the server
        socket.emit("answer", {answer});
    }

    render() {
        const {isPublished} = this.props;

        return(
            <div>
                <h2>{this.props.id}. {this.props.question}</h2>
                {
                    // if this is the currently published question, show the host that it is published
                    isPublished ? <p>Published</p> : null
                }
                {
                    // key, id of each answer = the letter
                    Object.keys(this.props.options).map(option => 
                        <button key={option} id={option} className="poll" variant="contained" 
                            onClick={this.sendAnswer}>
                            {option} : {this.props.options[option]}
                        </button>
                    )
                }
            </div>
        )
    }
}

export default Poll;