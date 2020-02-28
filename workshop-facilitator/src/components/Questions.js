import React from "react";
import Question from './Question';
import io_client from "socket.io-client";
import '../styles/Questions.css';

let socket;

class Questions extends React.Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            curID: 1,
            ENDPOINT: "localhost:5000",
        }
    }

    componentDidMount(){
        socket = io_client(this.state.ENDPOINT);

        // listen for when the server sends a new question that some client sent
        socket.on("question", data => {
          // update the questions to include the new question 
          this.setState(prevState => {
            const questions = prevState.questions.push({id:this.state.curID, question:data.question, upvotes:0});
            return questions;
          })
        })    
        this.setState({
            curID: this.state.curID + 1
        })
    }

    render() {
        return (
            <div className="qListContainer">
                {
                    this.state.questions && this.state.questions.length > 0 ?
                        this.state.questions.map(question => 
                            <Question key={question.id} question={question} />
                        )
                    : <p>No questions to yet</p>
                }
            </div>
        )
    }
}

export default Questions;