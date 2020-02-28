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

        console.log(this.props);

        // send the answer to the server
        socket.emit("answer", {answer});
    }

    render() {
        const {isPublished, isHost, showAnswer, poll, userAnswers} = this.props;
        console.log(userAnswers);

        // calculate what % of users voted for which answer if there exists any answers
        const totAnswers = userAnswers.answerA ? 
            userAnswers.answerA + userAnswers.answerB + userAnswers.answerC + userAnswers.answerD : 0;
        console.log(totAnswers);
        const percentA = userAnswers.answerA ? Math.floor((userAnswers.answerA / totAnswers) * 100) : 0;
        const percentB = userAnswers.answerB ? Math.floor((userAnswers.answerB / totAnswers) * 100) : 0;
        const percentC = userAnswers.answerC ? Math.floor((userAnswers.answerC / totAnswers) * 100) : 0;
        const percentD = userAnswers.answerD ? Math.floor((userAnswers.answerD / totAnswers) * 100) : 0;
        console.log(percentA, percentB, percentC, percentD);

        return(
            <div>
                <h2>{poll._id}. {poll.question}</h2>
                {
                    // if this is the currently published question, show the host that it is published
                    isPublished ? <p>Published</p> : null
                }

                {
                    // show the answer if set to true
                    showAnswer ? <p>{poll.answer}</p> : null
                }
                   
                {
                    // key, id of each answer = the letter
                    Object.keys(poll.options).map(option => 
                        // if a host, don't let them submit an answer
                        isHost ? 
                        <button key={option} id={option} className="poll" variant="contained" onClick={this.sendAnswer} 
                            style={{
                                backgroundColor: showAnswer && option === poll.answer ? "black" : "#E3E3E3",
                                color: showAnswer && option === poll.answer ? "white" : "black",
                            }} 
                            disabled>
                            {
                                // if published, able to show answers. if not, then don't show any answers
                                isPublished ? 
                                    <div style={{
                                        float: "left", backgroundColor: "#B2CEDE", 
                                        width: `${option === "A" ? percentA : 
                                            option === "B" ? percentB : option === "C" ? percentC :
                                            option === "D" ? percentD : 0}%`, 
                                        height: "80%", borderRadius: "10px",
                                        margin: "5px"}}>
                                    </div> : null
                            }
                            <p>
                                {option} : {poll.options[option]}
                            </p>
                        </button> :
                        // if not a host, allow answering
                        <button key={option} id={option} className="poll" variant="contained" 
                            onClick={this.sendAnswer}>
                            {option} : {poll.options[option]}
                        </button>
                    )
                }
            </div>
        )
    }
}

export default Poll;