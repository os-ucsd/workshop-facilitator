import React from "react";
import Question from './Question';
import io_client from "socket.io-client";
import '../styles/Questions.css';
import { Scrollbars } from 'react-custom-scrollbars';

let socket;

class Questions extends React.Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            curID: 1,
            ENDPOINT: "localhost:5000",
            latestQ: ""
        }
    }

    componentDidMount(){
        socket = io_client(this.state.ENDPOINT);

        // listen for when the server sends a new question that some client sent
        socket.on("question", data => {
            // update the questions to include the new question
            this.setState(prevState => {
            const questions = prevState.questions.push({id:this.state.curID, question:data.question, upvotes:0});
            this.setState({latestQ: {"id":this.state.curID, "question":data.question}});
            return questions;
            })

            this.setState({
                curID: this.state.curID + 1
            })
            this.updateQuestions();
        })
    }



    /*
    5/29 update:
    GOt the post request to work, but for some reason backend is only getting the question:String pair
    doesn't eget the currID, but maybe that's for the better

    made a state to set the "latest" question to to keep track, my need to incldue more info in the obj

    currID resets, so its isn't helpful in tracking order, maybe the indecies of the array are good enough

    clarify on what this array of questions is going to be used for? maybe keyvalue should include if it
    is resovled or not?



    */

    updateQuestions = () => {
        const {roomID} = this.props;
        console.log("HEre is the roomID in questions: " + roomID );
        const postQuestion = "http://localhost:5000/room/" + roomID + "/questions/add";
        console.log("Post request URL: " + postQuestion);
        let question = this.state.latestQ;
        console.log(question);

        fetch(postQuestion, {
            method: 'post',
            headers: {"Content-Type" : "application/json"}, //have to specify content type as json, or else server thinks its something else;
            body: JSON.stringify(question)
        })
        .then((resp) => resp.json())
        .then((data) => console.log("Question added"))
        .catch((err) => console.log("Error", err));

    }

    render() {
        return (
            <Scrollbars style={{height: "50vh", width: "85vw"}}>
            <div className="qListContainer">
                {
                    this.state.questions && this.state.questions.length > 0 ?
                        this.state.questions.map(question =>
                            <Question key={question.id} question={question} />
                        )
                    : <p>No questions to yet</p>
                }
            </div>
            </Scrollbars>

        )
    }
}

export default Questions;
