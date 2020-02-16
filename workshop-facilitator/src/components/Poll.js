import React from 'react';
import Grid from '@material-ui/core/Grid'

class Poll extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h2>Yo {this.props.question}</h2>
                {
                    Object.keys(this.props.options).forEach(option => 
                        <p>{option} : {this.props.options[option]}</p>
                    )
                }
            </div>
        )
    }
}

export default Poll;