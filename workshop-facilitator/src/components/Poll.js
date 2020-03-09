import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import '../styles/Polls.css'

class Poll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // if a user, then can only answer once so this is set to true once answered
            answered: "",
            colors: ["#748386", "#9DC7C8", "#6A3937", "#8F6593", "#698F3F", "#387D7A"],
            selectedColors: [],
            anchorEl: null
        }
    }

    componentDidMount(){
        let selectedColors = [];
        // calculate four different random colors for each answer choice
        let currIdx = Math.floor(Math.random() * this.state.colors.length);
        selectedColors.push(currIdx);

        // find a different color
        while (selectedColors.includes(currIdx)) currIdx = Math.floor(Math.random() * this.state.colors.length);
        selectedColors.push(currIdx);

        while (selectedColors.includes(currIdx)) currIdx = Math.floor(Math.random() * this.state.colors.length);
        selectedColors.push(currIdx);

        while (selectedColors.includes(currIdx)) currIdx = Math.floor(Math.random() * this.state.colors.length);
        selectedColors.push(currIdx);

        this.setState({selectedColors})
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

        // make it so the user can't answer again
        this.setState({answered: answer})

        // send the answer to the server
        socket.emit("answer", {answer});
    }

    openSettingsClick = evt => {
        this.setState({anchorEl: evt.target})
    }

    handleClose = evt => {
        this.setState({anchorEl: null})
    }

    render() {
        const {isPublished, isHost, showAnswer, poll, userAnswers, showUserAnswers,
            editPoll, unpublishPoll, getAnswers, displayAnswer} = this.props;
        const {answered} = this.state;

        const {selectedColors} = this.state;
        const colorA = this.state.colors[selectedColors[0]];
        const colorB = this.state.colors[selectedColors[1]];
        const colorC = this.state.colors[selectedColors[2]];
        const colorD = this.state.colors[selectedColors[3]];        

        let totAnswers = -1;
        let percentA = -1;
        let percentB = -1;
        let percentC = -1;
        let percentD = -1;

        // if user answers should be shown, show them
        if (Object.entries(userAnswers).length !== 0 && userAnswers.constructor === Object){
            // calculate what % of users voted for which answer if there exists any answers
            totAnswers = userAnswers.answerA >= 0? 
                userAnswers.answerA + userAnswers.answerB + userAnswers.answerC + userAnswers.answerD : 0;
            percentA = userAnswers.answerA ? Math.floor((userAnswers.answerA / totAnswers) * 100) : 0;
            percentB = userAnswers.answerB ? Math.floor((userAnswers.answerB / totAnswers) * 100) : 0;
            percentC = userAnswers.answerC ? Math.floor((userAnswers.answerC / totAnswers) * 100) : 0;
            percentD = userAnswers.answerD ? Math.floor((userAnswers.answerD / totAnswers) * 100) : 0;

        }

        const settingsMenu =
            <div>
                <div className="setting-icon-container">
                    <MoreVertIcon onClick={this.openSettingsClick}></MoreVertIcon>
                </div>
                <Menu anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose}>
                    <MenuItem  id={poll._id} onClick={editPoll}>Edit</MenuItem>
                    <MenuItem  id={poll._id} onClick={unpublishPoll}>Unpublish</MenuItem>
                    {
                        // determine whether to display show user answers or hide useranswers based on current state
                        showUserAnswers ? <MenuItem  id={poll._id} onClick={getAnswers}>Hide User Answers</MenuItem> :
                            <MenuItem  id={poll._id} onClick={getAnswers}>Get User Answers</MenuItem>

                    }
                    {
                        // determine whether to display show answer or hide answer based on current state
                        showAnswer ? <MenuItem  id={poll._id} onClick={displayAnswer}>Hide Answer</MenuItem> : 
                            <MenuItem  id={poll._id} onClick={displayAnswer}>Show Answer</MenuItem>
                    }
                </Menu>
            </div>

        return(
            <div>
                <div className="header">
                    <div className="header-text">
                        <h2>{poll._id}. {poll.question} </h2>
                        <p className="is-published-text">{isPublished && isHost ? "(published)" : null}</p>
                    </div>
                    {
                        // only show settings if the host is viewing
                        isHost ? settingsMenu : null
                    }
                </div>
                {
                    // key, id of each answer = the letter
                    Object.keys(poll.options).map(option => 
                        // if a host, don't let them submit an answer
                        isHost ? 
                        <button key={option} id={option} className="poll" variant="contained" onClick={this.sendAnswer} 
                            style={{
                                backgroundColor: showAnswer && option === poll.answer ? "black" : 
                                    option === "A" ? colorA : 
                                    option === "B" ? colorB :
                                    option === "C" ? colorC : colorD,
                                color: "white"
                            }} 
                            disabled>
                            {
                                // if published, able to show answers. if not, then don't show any answers
                                isPublished && showUserAnswers && totAnswers !== -1 ?        
                                        <div className="num-votes" style={{
                                            float: "left", backgroundColor: "#B2CEDE", 
                                            width: `${option === "A" ? percentA : 
                                                option === "B" ? percentB : option === "C" ? percentC :
                                                option === "D" ? percentD : 0}%`, 
                                            height: "100%", borderRadius: "10px", bottom: "0px"}}>
                                        </div> : null
                            }
                            <p className="options-text">
                                {option} : {poll.options[option]}
                            </p>
                        </button> :
                        // if not a host, allow answering
                        answered !== "" ? 
                            // if answered, don't allow answer again
                            <button key={option} id={option} className="poll" variant="contained"
                                style={{
                                    backgroundColor: answered === option ? "#B2CEDE" : "black",
                                    color: "white",
                                    //border: answered === option ? "5px" : "0px"
                                }}>
                                {option} : {poll.options[option]}
                            </button> :
                            <button key={option} id={option} className="poll" variant="contained" 
                                style={{
                                    backgroundColor: answered === option ? "#B2CEDE" : 
                                        option === "A" ? colorA : 
                                        option === "B" ? colorB :
                                        option === "C" ? colorC : colorD,
                                    color: "white"
                                }}
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