import React from 'react';
import Grid from '@material-ui/core/Grid'

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
                        <p>Yo {option} : {this.props.options[option]}</p>
                    )
                }
            </div>
        )
    }
}

export default Poll;