import React from 'react';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import Grid from '@material-ui/core/Grid';

import './css/Question.css';

class Question extends React.Component{
    addUpvote = evt => {
        evt.preventDefault();
        // increase upvote count and save to database
        let newUpvoteCount = this.props.question.upvotes + 1;
        console.log(newUpvoteCount);
    }

    render(){
        return(
            <div className="qContainer">
                <Grid container spacing={1}>
                    <Grid item xs={1}>
                        <ArrowUpwardRoundedIcon onClick={this.addUpvote} className="upvoteClick" large="true" />
                        <p className="numUpvotes">{this.props.question.upvotes}</p>
                    </Grid>
                    <Grid item xs={11}>
                        <p className="qText">{this.props.question.question}</p>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Question;