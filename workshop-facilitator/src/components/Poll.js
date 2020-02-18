import React from 'react';

import '../styles/Polls.css'

class Poll extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h2>{this.props.id}. {this.props.question}</h2>
                {
                    Object.keys(this.props.options).map(option => 
                        <button className="poll" variant="contained">{option} : {this.props.options[option]}</button>
                    )
                }
            </div>
        )
    }
}

export default Poll;