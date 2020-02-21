import React from 'react';

import '../styles/Polls.css'

class Poll extends React.Component {
    constructor(props) {
        super(props);
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

        // send the answer to the server
        socket.emit("answer", {answer});
    }

    render() {
        return(
            <div>
                <h2>{this.props.id}. {this.props.question}</h2>
                {
                    // key, id of each answer = the letter
                    Object.keys(this.props.options).map(option => 
                        <button key={option} id={option} className="poll" variant="contained">
                            {option} : {this.props.options[option]}
                        </button>
                    )
                }
            </div>
        )
    }
}

export default Poll;