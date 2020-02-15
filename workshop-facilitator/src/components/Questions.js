import React from "react";
import Question from './Question';

import './css/Questions.css';

class Questions extends React.Component {
    constructor() {
        super();
        this.state = {
            // template question object
            questions: [{
                id: 1,
                question: "hello, what is ree act?",
                upvotes: 0
            }, {
                id: 2,
                question: "fuck u",
                upvotes: 5
            }, {
                id: 3,
                question: "fuck u",
                upvotes: 5
            }, {
                id: 4,
                question: "fuck u",
                upvotes: 5
            }]
        }
    }

    componentDidMount(){
        // make axios request to get list of questions
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